import { useContext, useState } from "react";
import axios from "axios";
import { RegisterRoute } from "../utils/ApiRoutes";
import { items } from "../constant/constantData";
import infoContext from "../utils/infoContext";
import { useNavigate , Link } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import {SelectCountries} from "../components/index";
import toastOption from "../utils/toastOption";



const TransactionDetails = () => {
  
  const navigate = useNavigate()

  const { info, setEmail, email ,phone } = useContext(infoContext);
  const [per,setPer] = useState(true)
  const [open, setOpen] = useState(false);
  const [suffixes , setSuffixes] = useState("");
  const [loading , setLoading] = useState(false)
  const [admin, setAdmin] = useState("")
  const handleEmail = (Email) => {
    setEmail(Email.target.value);
  };
  const handleValidation = ()=>{
    
    if(!email){
      toast.error("You must enter a valid email address" ,toastOption)
      return false;
    }else if(!phone.startsWith(suffixes)){
      toast.error("You must enter your country suffixes and correct phone number" ,toastOption)
      return false;
    }else{
      return true;
    }
  }
  const fetchData = async ()=>{

    const {transactionTitle , instagramLink , itemDescription ,price} = info
    const UserData = await axios.post(RegisterRoute ,{
      email ,
      phone,
      transactionTitle,
      instagramLink,
      itemDescription,
      price,
      role: "user" , 
    })
     localStorage.setItem("UserData", JSON.stringify(UserData))
     
  }

  
  const handleSubmit =(event)=>{
    event.preventDefault()
    handleValidation()
    fetchData()
  
        setPer(false)
    }

    const Clicked = ()=>{
      toast.error("The Escrow fee is already paid from the buyer" ,toastOption)
    }



  return (
    <div className=" w-full h-full mt-8 flex justify-center items-center">
      <form 
        onSubmit={event=>handleSubmit(event)}
        className="w-[90%] md:w-4/5 h-4/5 relative bg-white p-3">
        <p className="w-full capitalize text-start text-[#01426a]  relative text-2xl  font-medium ">
          Transaction Details
          <span className="line delay-[0.4s]"></span>
        </p>
        <div className="relative">
          <input
            defaultValue={info.transactionTitle}
            type="text"
            className="w-full pl-[10px] rounded h-14 mt-8 inputs "
          />
          <span
            className="capitalize  absolute left-0  bottom-[20%] ml-[20px]  
              "
          >
            transaction title
          </span>
        </div>

        <div className=" w-full flex flex-col md:flex-row online z-2 justify-between items-center">
          <div className="relative w-full md:w-1/3 ml-[10px] mr-[10px]">
            <input
              type="text"
              defaultValue="Seller"
              className="w-[100%] md:w-1/3  rounded h-14 mt-8 inputValid pl-[10px] "
            />
            <span className="capitalize ml-[10px] w-[90px] absolute left-0  bottom-[20%]">
              my role
            </span>
          </div>
          <div className="relative w-full md:w-1/3 ml-[10px] mr-[10px]">
            <input
              type="text"
              defaultValue="USD"
              readOnly
              className="w-1/3 rounded h-14 mt-8  inputValid text-center text-xl"
            />
            <span className="capitalize w-[90px] absolute left-0  bottom-[20%] ml-[10px] ">
              currency
            </span>
          </div>
          <div className="relative w-full md:w-1/3 ml-[10px] mr-[10px]">
            <input
              type="text"
              defaultValue="1"
              readOnly
              className=" rounded h-14 mt-8 inputValid  text-center text-xl"
            />
            <span className="capitalize w-[130px] absolute left-0  bottom-[20%] ml-[10px]">
              inspection period
            </span>
          </div>
        </div>

        <div>
          <h1 className=" w-full flex justify-start ml-[10px] my-[15px] capitalize text-xl font-semibold">
            {" "}
            item details
          </h1>
        </div>
        <div className="w-full text-base h-[170px] border-[1px] border-solid border-stone-500 ">
          <div className="w-full font-semibold flex justify-between px-[20px] mt-4">
            <h1>{info.instagramLink}</h1>
            <h1>${info.price}</h1>
          </div>
          <h1 className="w-full font-semibold flex justify-between px-[20px] mt-4 capitalize">
            domain
          </h1>
          <h1 className="w-full font-semibold flex justify-between px-[20px] mt-4 capitalize">
            selling for forbes
          </h1>
          <h1 className="w-full font-semibold flex justify-between px-[20px] mt-4 capitalize">
            Inspection Period: 1 Day
          </h1>
        </div>
        <div>
          <h1 className=" w-full flex justify-start ml-[10px] my-[15px]  capitalize text-xl font-bold">
            transaction summary
          </h1>
          <div className="w-full font-semibold flex justify-between px-[20px] mt-4">
            <h1 className="capitalize">subtotal:</h1>
            <h1>$1.00</h1>
          </div>
          <div className="w-full font-semibold flex justify-between px-[20px] mt-4">
            <div className="relative capitalize flex">
              <h1>escrow fee paid by :</h1>
              <div className="flex ">
                <h1
                  className="cursor-pointer text-l font-bold text-[#209a20]"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  buyer
                </h1>
                <i
                  className="bx bx-caret-down text-xl"
                  onClick={() => {
                    setOpen(!open);
                  }}
                ></i>
                <ul className="absolute right-[-10px] top-[30px]  bg-white boxShadow">
                  {open &&
                    items.map((item) => {
                      return (
                        <li
                          className="text-start  my-[5px] hover:bg-[#1bde1b3f] rounded pl-[5px]"
                          onClick={() => {
                            Clicked();
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            <h1>$25.00</h1>
          </div>
          <span className="absolute ml-[10px] left-0 w-[97%] bg-black h-[1px]"></span>
          <div className="w-full mt-8 flex flex-col justify-center items-center text-center uppercase">
            <h1 className=" w-full md:w-3/5 text-[14px] font-semibold">
              MAKE SURE THAT YOU DON'T SHARE ANY INFORMATION OUT OF OUR WEBSITE
              WE ARE NOT RESPONSIBLE FOR ANY ACTIONS FROM THIS KIND, STAY IN THE
              WEBSITE AND AS SOON AS THE THE LIVE CHAT STARTS OUR AGENT WILL
              CONTACT YOU AND GIVE YOU INSTRUCTIONS.
            </h1>
            <h1 className="mt-5 font-bold">
              All prices are in USD.taxes may apply
            </h1>
          </div>
        </div>
        <div className="w-full">
          <h1 className=" w-full flex justify-start ml-[10px] my-[15px] capitalize text-xl font-semibold">
            seller details
          </h1>
          <p className="w-full text-start ml-[10px] capitalize ">
            {" "}
            please confirm your details below :
          </p>
          <div className="w-full px-[10px] flex flex-col md:flex-row gap-[10px]">
            <input
              type="email"
              onChange={(e) => handleEmail(e)}
              placeholder="Email"
              className="md:w-1/2 w-full rounded pl-[10px] mt-8 h-[50px] country text-start text-xl"
            />
            <SelectCountries setSuffixes={setSuffixes}/>

          </div>
          <span className="absolute ml-[10px] mt-[20px] left-0 w-[97%] bg-black h-[1px]"></span>
        </div>
        <div className="mt-[50px] w-full flex justify-center items-center font-semibold text-[10px] md:text-xl">
          <input type="checkbox" required />
          <p> I have read and agree to the
            <Link className="capitalize text-blue-700"> General Escrow Instructions 
              </Link> and 
              <Link className="capitalize text-blue-700">Privacy Policy.</Link></p>
        </div>
        <div className="w-full flex justify-center items-center h-[70px]">
          {
            per ? 
              <button
                type="submit"
                className="flex justify-center  w-1/2  items-center h-[70px]"
              >
                <h1 className="m-5 bg-[#01426a] text-white px-[20px] py-[10px] rounded-xl capitalize font-semibold">
                  start transaction
                </h1>
              </button>
              :
                    <Link
                    to={'/chat'}
                    type="submit"
                    className="flex justify-center  w-1/2  items-center h-[70px]"
                  >
                    <h1 className="m-5 bg-[#01426a] text-white px-[20px] py-[10px] rounded-xl capitalize font-semibold">
                      start transaction
                    </h1>
                  </Link>
          }
        
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default TransactionDetails;
