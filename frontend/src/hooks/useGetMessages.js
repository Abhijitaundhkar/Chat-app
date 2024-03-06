import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) {
          return toast.error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessage();
  }, [selectedConversation?._id, setMessages]);
  return { loading, messages };
};

export default useGetMessage;
