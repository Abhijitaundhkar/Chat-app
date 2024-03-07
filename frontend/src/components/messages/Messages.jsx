import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skleltons/MessageSkeeltons";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length>0 && messages.map((message)=><Message key={message._id} message={message}/>)}
      {loading && [...Array(3)].map((_, idx)=><MessageSkeleton key={idx} />)}
      {!loading && messages.length===0 && (<p className="text-center text-white"> Send message to start conversation</p>)}
    </div>
  );
};

export default Messages;
