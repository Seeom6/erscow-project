import { useState, useEffect, useContext } from "react";
import axios from "axios";
import infoContext from "../utils/infoContext";

const SelectCountries = ({ setSuffixes }) => {
  const { setPhone } = useContext(infoContext);

  const [defaultCountry, setDefaultCountry] = useState(false);
  const [countries, setCountries] = useState("");

  const fetchData = async () => {
    const res = await axios.get(" https://restcountries.com/v3.1/all");
    setCountries(res.data);
  };

  const [countryNumber, setCountryNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");

  const handleClick = (e, suffixes, flag, f,item) => {
    setCountryNumber(e + suffixes);
    setFlag(flag);
    setOpen(f);
    setSuffixes(countryNumber);
    setDefaultCountry(true)
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (phonNumber) => {
    setPhone(phonNumber.target.value);
  };

  return (
    <>
      <div className="md:w-1/2 w-full h-[50px] mt-[30px] relative">
        <input
          onChange={(e) => handleChange(e)}
          defaultValue={ countryNumber || `+268` }
          type="text"
          className="w-full inputs h-full text-[12px] text-center"
        />
        <div className="absolute z-[22] top-[20px] ml-[10px]">
          <img src={defaultCountry ? flag: "https://flagcdn.com/w320/um.png"} alt="" className="w-[30px]  h-[15px]" />
        </div>

        <div className="relative  z-[3] w-full right-0 bottom-[0] mr-[15px]">
          {open && (
            <ul className="z-2 w-full h-[100px] flex flex-col justify-center items-center  overflow-y-scroll bg-white boxShadow absolute bottom-[-100px] right-0">
              <div className="absolute w-[90%] top-0">
                {countries.map((item) => (
                  
                  <div
                    key={Math.random()}
                    onClick={() =>
                      handleClick(
                        item.idd.root,
                        item.idd.suffixes,
                        item.flags.png,
                        false
                        ,item
                      )
                    }
                    className="flex justify-between items-center"
                  >
                    <li>
                      <img
                        src={item.flags.png
                        }
                        alt=""
                        className="w-[30px] h-[15px]"
                      />
                    </li>
                    <li className="capitalize text-start  my-[5px] hover:bg-[#1bde1b3f] rounded pl-[5px]">
                      {item.name.common}
                    </li>
                  </div>
                ))}
              </div>
            </ul>
          )}
        </div>
        <i
          onClick={() => setOpen(!open)}
          className=" bx bx-chevron-down text-xl absolute right-[5px] top-[12px] "
        ></i>
      </div>
    </>
  );
};

export default SelectCountries;
