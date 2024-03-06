import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetConversation() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversions] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          return toast.error(data.error);
        }
        setConversions(data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
}

export default useGetConversation;
