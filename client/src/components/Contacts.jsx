import { useState } from "react";

const Contacts = ({ contacts, changeChat, setClicked, currentUser }) => {
  const [currentSelected, setCurrentSelected] = useState("");
  const handleClick = (user, index) => {
    setCurrentSelected(index);
    changeChat(user);
    setClicked(false);
  };

  return (
    <>
      <div className=" w-[250px] md:w-[400px] flex flex-col gap-[15px] h-[70%] overflow-y-scroll mt-[60px] mb-[40px] absolute z-[10] contacts">
        <div>
          {contacts &&
            contacts.map((user, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleClick(user, index)}
                  className={`${currentSelected === index ? "selected" : ""} ${
                    user === currentUser ? "none" : ""
                  }grid grid-columns w-[95%] items-center h-[50px] bg-[#4b4848] my-[15px] px-[5px] rounded-xl`}
                >
                  <h1 className="  w-[45px] p-[10px] flex justify-center bg-green-500 rounded-full">
                    {user.email.split("")[0].toUpperCase()}
                  </h1>
                  <h1 className="flex justify-center items-center">
                    {user.email.split("@")[0]}
                  </h1>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Contacts;
