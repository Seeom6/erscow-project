import { useState } from "react";

const ChatInput = ({ handleSendMsg, setClicked, clicked, role }) => {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="w-[100%]">
      <form
        onSubmit={sendChat}
        className="w-full flex justify-center items-center md:px-[10px]"
      >
        <i
          onClick={() => setClicked(!clicked)}
          className={`bx bx-message-square-dots  text-white text-[40px] z-[23]
                mx-[5px]`}
        ></i>
        <input
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          type="text"
          placeholder="type any Message..."
          className="w-[95%] p-[7px] rounded-xl bg-[#ffffff34]"
        />
        <button
          type="submit"
          className=" ml-[2px] md:ml-[10px] rounded-xl px-[10px] bg-[#9a86f3]"
        >
          <i className={`bx bx-send text-white text-3xl `}></i>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
