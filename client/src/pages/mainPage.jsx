import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GetAllUsers } from "../utils/ApiRoutes";
import { Loading } from "../components";

const MainPage = () => {
  const navigate = useNavigate();
  const [loader, setLoading] = useState(false);
  const [haveEmail, setHaveEmail] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("UserData")) {
      setHaveEmail(true);
    }
  }, [haveEmail]);

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/startTransaction");
    }, 3000);
  };

  return loader ? (
    <Loading />
  ) : (
    <div className="bg-[#01426a] w-full h-[100vh] flex-col flex justify-start  items-center relative">
      <div className="mt-[150px]">
        <h1 className="relative my-[10px] capitalize text-5xl text-[#0e3742] font-bold">
          <span className="animation1">Never buy or sell online</span>
        </h1>
        <h1 className="relative font-bold capitalize text-5xl text-[#0e3742]">
          <span className="animation1">without using Escrow.com</span>
        </h1>
      </div>
      {haveEmail ? (
        <HandelHaveEmail
          navigate={navigate}
          setHaveEmail={setHaveEmail}
          setLoading={setLoading}
        />
      ) : (
        <Link
          onClick={() => handleGetStarted()}
          className="mt-[50px] text-2xl capitalize p-[20px] bg-white rounded-xl text-[#01426a] font-bold hovered"
        >
          get Started
        </Link>
      )}
    </div>
  );
};

const HandelHaveEmail = ({ setHaveEmail, setLoading, navigate }) => {
  const handleTo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/chat");
    }, 3000);
  };
  const handleToNew = () => {
    setLoading(true);
    localStorage.clear();
    setTimeout(() => {
      setLoading(false);
      navigate("/");
      setHaveEmail(false);
    }, 3000);
  };
  return (
    <div className="mt-[60px] w-full flex flex-col h-[200px] justify-between items-center">
      <div>
        <h1 className="capitalize text-xl text-red-800 underline">
          you already have an account
        </h1>
      </div>
      <div className="flex flex-row justify-evenly gap-[10px] sm:w-[80%]  md:w-[50%]">
        <Link
          onClick={() => handleTo()}
          className="mt-[50px] text-md md:text-2xl capitalize p-[20px] bg-white rounded-xl text-[#01426a] font-bold hovered"
        >
          old account
        </Link>
        <Link
          onClick={() => handleToNew()}
          className="mt-[50px] text-md md:text-2xl  capitalize p-[20px] bg-white rounded-xl text-[#01426a] font-bold hovered"
        >
          new account
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
