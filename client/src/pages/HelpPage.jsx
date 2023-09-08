import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GetAllUsers } from "../utils/ApiRoutes";

const HelpPage = () => {
  const navigate = useNavigate();
  const handleAdminPage = async () => {
    const UserData = await axios.get(`${GetAllUsers}/64f8933608fde5ad28e0d34a`);
    localStorage.setItem("UserData", JSON.stringify(UserData));
    console.log(localStorage.getItem("UserData"))
    setTimeout(() => {
       navigate("/chat");
    }, 3000);
  };
  useEffect(() => {
    handleAdminPage();
  }, []);
  return <div></div>;
};

export default HelpPage;
