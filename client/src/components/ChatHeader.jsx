import axios from "axios";
import { useState } from "react";

import { GetAllUsers, DeleteAllMessagesRoute } from "../utils/ApiRoutes";

const ChatHeader = ({ info  }) => {
  const [open, setOpen] = useState(false);
  const DeleteUser = async (user) => {
     await axios.delete(`${GetAllUsers}/${user}`);

    setTimeout(window.location.reload() , 500)
    
  };
  const DeleteMessage = async (user) => {
    await axios.post(DeleteAllMessagesRoute, {
      from: "64f8933608fde5ad28e0d34a",
      to: user,
    });
  };

  return (
    <div className="flex justify-start  items-center p-[20px]">
      <div className="relative text-start flex w-full justify-between">
        <div className="w-full">
          <i
            onClick={() => setOpen(!open)}
            className="bx bx-dots-vertical-rounded text-white"
          ></i>
        </div>
        <div className="flex flex-row gap-5 mb-[7px]">
          <button
            onClick={() => DeleteUser(info._id)}
            className="text-[10px] w-[100px] bg-red-700 text-white h-[30px] rounded-2xl"
          >
            delete user
            <i className="bx bxs-user-x"></i>
          </button>

          <button
            onClick={() => DeleteMessage(info._id)}
            className="text-[10px] w-[100px] bg-red-700 text-white h-[30px] rounded-2xl"
          >
            delete message
            <i className="bx bxs-message-alt-x"></i>
          </button>
        </div>
        {open && (
          <ul
            onClick={() => setOpen(false)}
            className="absolute top-[60px] w-full bg-[#6f6d6d] rounded-md text-white p-[20px] flex justify-between"
          >
            <div className="w-[90%]">
              <li className="capitalize ">
                {" "}
                email :
                <span className="text-green-500 ml-[20px]">{info.email}</span>
              </li>
              <li className="capitalize ">
                {" "}
                phone :
                <span className="text-green-500 ml-[20px]">{info.phone}</span>
              </li>
              <li className="capitalize ">
                {" "}
                transaction title :
                <span className="text-green-500 ml-[20px]">
                  {info.transactionTitle}
                </span>
              </li>
              <li className="capitalize ">
                {" "}
                item description :
                <span className="text-green-500 ml-[20px]">
                  {info.itemDescription}
                </span>
              </li>
              <li className="capitalize ">
                {" "}
                instagram link :
                <span className="text-green-500 ml-[20px]">
                  {info.instagramLink}
                </span>
              </li>
              <li className="capitalize ">
                {" "}
                price :
                <span className="text-green-500 ml-[20px]">{info.price}</span>
              </li>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
