import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetAllUsers, host } from "../utils/ApiRoutes";
import {
  Contacts,
  Welcome,
  ChatContainer,
  ContainerChatUser,
} from "../components/index";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [role, setRole] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [clicked, setClicked] = useState(true);


  const getCurrentUser = async () => {
    if (!localStorage.getItem("UserData")) {
      navigate("/startTransaction");
      
    } else {
      const userInfo = await JSON.parse(localStorage.getItem("UserData"));
      setCurrentUser(userInfo.data);
      if (userInfo.data.data.role === "admin") {
        setRole(true);
      }
    }
  };
  const getUsers = async () => {
    const { data } = await axios.get(GetAllUsers);
    setContacts(data.data);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host , {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd"
        }
      });
      socket.current.emit("add-user", currentUser.data._id);
    }
  }, [currentUser]);

  useEffect(() => {
    getUsers();
    setLoadUser(false);
  }, [loadUser, []]);
  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
    setIsLoaded(true);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  if (role) {
    return (
      <div className="h-screen w-[100vw] flex justify-center items-center bg-[#131324] ">
        <div className="h-[100%]  w-full md:w-[85vw] bg-[#00000076] flex justify-between">
          <div className={`${clicked ? "clicked" : "clicked-effects"} `}>
            <Contacts
              currentUser={currentUser}
              clicked={clicked}
              setClicked={setClicked}
              contacts={contacts}
              changeChat={handleChangeChat}
            />
          </div>
          {isLoaded ? (
            <ChatContainer
              setLoadUser={setLoadUser}
              socket={socket}
              currentChat={currentChat}
              currentUser={currentUser}
              clicked={clicked}
              setClicked={setClicked}
            />
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-[100vw] flex  justify-center items-center bg-[#131324] ">
        <div className="h-[85vh] w-full md:w-[85vw] bg-[#00000076] flex flex-col justify-between">
          <ContainerChatUser
            socket={socket}
            currentChat={currentChat}
            currentUser={currentUser}
            clicked={clicked}
            setClicked={setClicked}
            role={role}
          />
        </div>
      </div>
    );
  }
};

export default Chat;
