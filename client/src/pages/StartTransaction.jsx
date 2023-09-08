import { useState, useContext } from "react";
import infoContext from "../utils/infoContext";
import { useNavigate } from "react-router-dom";
import { DropDown, Loading } from "../components/index";
import { myRole, itemCategory } from "../constant/constantData";
import { ToastContainer, toast } from "react-toastify";
import toastOption from "../utils/toastOption";
import "react-toastify/dist/ReactToastify.css";

const StartTransaction = () => {
  const navigate = useNavigate();
  const { setInfo  , setAccess} = useContext(infoContext);

  const [values, setValues] = useState({
    transactionTitle: "",
    instagramLink: "",
    itemDescription: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { transactionTitle, instagramLink, itemDescription, price } = values;
    if (!transactionTitle) {
      toast.error("You must write your transaction title", toastOption);
      return false;
    } else if (!instagramLink.endsWith("/instagram.com")) {
      toast.error(
        "You must input your instagram link like : name/instagram.com",
        toastOption
      );
      return false;
    } else if (!itemDescription) {
      toast.error("You must write description", toastOption);
      return false;
    } else if (!price) {
      toast.error(
        "You must write your price and it will be (USD)",
        toastOption
      );
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      setInfo(values);
      setAccess(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/transactionDetails");
      }, 3000);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className=" w-full h-full mt-8 flex justify-center items-center">
      <form
        className="md:w-4/5 h-4/5 relative w-[90%] bg-white p-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <p className="w-full capitalize text-start text-[#01426a]  relative text-2xl  font-medium ">
          start transaction
          <span className="line delay-[0.4s]"></span>
        </p>
        <div className="relative">
          <input
            type="text"
            name="transactionTitle"
            onChange={(e) => handleChange(e)}
            className="w-full pl-[10px]  rounded h-14 mt-8 inputs"
          />
          <span
            className="capitalize  absolute left-0  bottom-[20%] ml-[20px]  
              "
          >
            transaction title
          </span>
        </div>

        <div className="flex flex-col online z-2 justify-between items-center md:flex-row ">
          <div className="relative   ml-[10px] mr-[10px] w-full md:w-1/3">
            <input
              type="text"
              defaultValue="Seller"
              className="w-1/3 rounded h-14 mt-8 inputValid pl-[10px] "
            />
            <span className="capitalize ml-[10px] w-[90px] absolute left-0  bottom-[20%]">
              my role
            </span>
            <DropDown details={myRole} rol={"seller"} />
          </div>
          <div className="relative  ml-[10px] mr-[10px] w-full md:w-1/3">
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
          <div className="relative ml-[10px] mr-[10px] w-full md:w-1/3">
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

        <div className="relative flex flex-col md:flex-row justify-between z-0 mt-[10px] w-full">
          <div className=" w-full relative z-1 md:w-1/2 mx-[5px] ">
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              placeholder="/instagram.com"
              name="instagramLink"
              className=" md:w-1/2 rounded h-14 mt-8 inputValid text-start text-xl px-[20px]"
            />
            <span className="capitalize w-[130px] absolute left-0  bottom-[20%] ml-[10px] z-0">
              item name
            </span>
          </div>
          <div className="relative w-full md:w-1/2 mx-[5px]">
            <input
              type="number"
              name="price"
              onChange={(e) => handleChange(e)}
              placeholder="$800"
              className="px-[20px] rounded h-14 mt-8 inputValid text-start text-xl"
            />
            <span className="capitalize w-[130px] absolute left-0  bottom-[20%] ml-[10px]">
              price (USD)
            </span>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            defaultValue="Domain"
            className="w-full rounded h-14 px-[10px] mt-8 inputValid "
          />
          <span
            className="capitalize  absolute left-0  bottom-[20%] ml-[20px]  
              "
          >
            item category
          </span>
          <DropDown details={itemCategory} items={"Category"} />
        </div>
        <div className="relative">
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            name="itemDescription"
            className="w-full px-[10px] rounded h-14 mt-8 inputs "
          />
          <span
            className="capitalize  absolute left-0  bottom-[20%] ml-[20px]  
              "
          >
            item description
          </span>
        </div>
        <div className="w-full flex justify-end items-center h-[70px]">
          <button
            type="submit"
            className="flex justify-end items-center h-[70px]"
          >
            <h1 className="m-5 bg-[#01426a] text-white px-[20px] py-[10px] rounded-xl">
              Proceed
            </h1>
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
export default StartTransaction;
