import useGetMessage from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = async () => {
  const { messages, loading } = useGetMessage();
  console.log("messages", messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
