import Conversion from "../models/conversionModel.js";
import Message from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiveId } = req.params;
    const senderId = req.user._id;
    let conversion = await Conversion.findOne({
      participant: { $all: [senderId, receiveId] },
    });
    if (!conversion) {
      conversion = await Conversion.create({
        participant: [senderId, receiveId],
      });
    }
    let newMessage = await Message.create({
      senderId,
      receiveId,
      message,
    });
    if (newMessage) {
      conversion.messages.push(newMessage._id);
    }
    // await conversion.save()
    // await newMessage.save()
    await Promise.all([conversion.save(), newMessage.save()]);

    //socket functionality
    const receiverSocketId = getReceiverSocketId(receiveId);
    if (receiverSocketId) {
      //io.to(<socket_id>).emt() used to send event specific client
      io.to(receiverSocketId).emit("newMessage", newMessage); //
      console.log(newMessage);
    }
    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Message error", err);
    res.status(500).json({ error: "Check error " });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatID } = req.params;
    const senderId = req.user._id;
    const conversion = await Conversion.findOne({
      participant: { $all: [senderId, userToChatID] },
    }).populate({ path: "messages", model: "Message" }); //get messages from message collection
    if (!conversion) return res.status(200).json([]);
    res.status(200).json(conversion.messages);
  } catch (err) {
    console.log("get error", err);
    res.status(500).json({ error: "Check error " });
  }
};
