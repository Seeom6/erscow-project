import { useState } from "react";
import "./App.css";
import { Header } from "./components/index";
import {
  StartTransaction,
  TransactionDetails,
  MainPage,
  Chat,
  HelpPage,
} from "./pages/index";
import { Route, Routes } from "react-router-dom";
import infoContext from "./utils/infoContext";

function App() {
  const [info, setInfo] = useState({});
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [getAdmin, setGetAdmin] = useState();
  const [access, setAccess] = useState(false)
  const currentValue = {
    info,
    getAdmin,
    setInfo,
    setGetAdmin,
    phone,
    setPhone,
    access,
    setAccess,
    email,
    setEmail,
  };

  return (
    <div className="App">
      <Header />
      <infoContext.Provider value={currentValue}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/this034948374837" element={<HelpPage />} />
          <Route path="/startTransaction" element={<StartTransaction />} />
          <Route path="/transactionDetails" element={<TransactionDetails />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </infoContext.Provider>
    </div>
  );
}

export default App;
