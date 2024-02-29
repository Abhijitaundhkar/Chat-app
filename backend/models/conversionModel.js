import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema(
  {
    participant: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
  },
  { timestamps: true }
);

const Conversion = mongoose.model("Conversion", conversionSchema);

export default Conversion;
