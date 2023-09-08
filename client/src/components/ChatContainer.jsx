import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute } from "../utils/ApiRoutes";

const ChatContainer = ({
  currentChat,
  currentUser,
  socket,
  setClicked,
  clicked,
  setLoadUser,
}) => {
  const scrollRef = useRef();
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchMessage = async () => {
    if (currentChat) {
      const res = await axios.post(getAllMessagesRoute, {
        from: currentUser.data._id,
        to: currentChat._id,
      });
      setMessages(res.data);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [arrivalMessages, []]);

  async function handleSendMsg(msg) {
    await axios.post(sendMessageRoute, {
      from: currentUser.data._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
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

  // useEffect(()=>{
  //   scrollRef.current.scrollIntoView({behavior: "smooth"})
  // },[messages])

  return (
    <div className="w-full flex flex-col justify-between">
      <ChatHeader  info={currentChat} setLoadUser={setLoadUser} />

      <div className="text-white p-[1rem] w-full flex flex-1 flex-col gap-[1rem] overflow-auto">
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
      <ChatInput
        handleSendMsg={handleSendMsg}
        setClicked={setClicked}
        clicked={clicked}
      />
    </div>
  );
};

export default ChatContainer;
