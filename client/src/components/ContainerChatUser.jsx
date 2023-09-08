import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  sendMessageRoute,
  getAllMessagesRoute,
  GetAllUsers,
} from "../utils/ApiRoutes";
import ChatInput from "./ChatInput";

const ContainerChatUser = ({
  role,
  currentChat,
  currentUser,
  socket,
  setClicked,
  clicked,
}) => {
  const scrollRef = useRef();
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState(undefined);

  const getAdmin = async () => {
    const admin = await axios.get(`${GetAllUsers}/64f8933608fde5ad28e0d34a`);
    setCurrentAdmin(admin.data.data._id);
  };

  const fetchMessage = async () => {
    if (currentAdmin) {
      const res = await axios.post(getAllMessagesRoute, {
        from: currentUser.data._id,
        to: currentAdmin,
      });
      setMessages(res.data);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [arrivalMessages, []]);

  useEffect(() => {
    getAdmin();
  }, []);

  async function handleSendMsg(msg) {
    await axios.post(sendMessageRoute, {
      from: currentUser.data._id,
      to: currentAdmin,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentAdmin,
      from: currentUser.data._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessages({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages]);


  return (
    <div className="flex flex-col justify-end h-[100%]">
      <div className="text-white p-[1rem] w-full flex flex-col gap-[1rem] overflow-auto">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="w-full relative z-[2]" ref={scrollRef}>
              <div
                className={`message ${msg.fromSelf ? "sended" : "received"}`}
              >
                <div className="text-content content">
                  <p className="">{msg.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" w-full flex justify-center items-end">
        <ChatInput
          role={role}
          handleSendMsg={handleSendMsg}
          setClicked={setClicked}
          clicked={clicked}
        />
      </div>
    </div>
  );
};

export default ContainerChatUser;
