import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import toastOption from "../utils/toastOption";
import "react-toastify/dist/ReactToastify.css";

const DropDown = (props) => {
  const [open, setOpen] = useState(false);
  const clicked = () => {
    if (props.rol === "seller") {
      toast.error("You are already assigned as the seller", toastOption);
    } else {
      toast.error("You are already assigned as the Domain", toastOption);
    }
    setOpen(false);
  };

  return (
    <div className="relative z-[3] w-full right-0 bottom-[18%] mr-[15px]">
      {open && (
        <ul className="z-2 w-full h-[100px] flex flex-col justify-center items-center  overflow-y-scroll bg-white boxShadow absolute bottom-[-100px] right-0">
          <div className="absolute w-[90%] top-0">
            {props.details.map(function (role, ind) {
              return (
                <li
                  key={ind}
                  onClick={() => clicked()}
                  className="capitalize  top-0  text-start  my-[5px] hover:bg-[#1bde1b3f] rounded pl-[5px]"
                >
                  {role}
                </li>
              );
            })}
          </div>
        </ul>
      )}
      <div className="absolute right-[10px] top-[-40px]">
        <i
          onClick={() => setOpen(!open)}
          className="bx bx-caret-down text-xl  "
        ></i>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DropDown;
