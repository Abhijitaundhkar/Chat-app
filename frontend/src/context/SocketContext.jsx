import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  console.log(socket);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { authUser } = useAuthContext();
  console.log(onlineUsers, "setOnlineUsers", authUser);
  useEffect(() => {
    if (authUser) {
      const socket = io("http://127.0.0.1:3000", {
        query: {
          userId: authUser._id,
        },
      });
      console.log(socket);
      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        console.log(users);
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
