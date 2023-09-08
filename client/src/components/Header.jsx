import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full h-[80px] bg-[#01426a] uppercase flex flex-row justify-between items-center md:px-20">
      <div>
        <Link to="https://www.escrow.com/" className="h-[60px]">
          <img className="md:h-[60px] h-[40px]" src={logo} alt="logo" />
        </Link>
      </div>
      <div>
        <Link
          to="https://www.google.com/amp/s/www.escrow.com/support/faqs/the-escrow-process%3famp=true"
          className="text-white uppercase md:font-lg text-sm mr-[10px]"
        >
          Help and FAQs
        </Link>
      </div>
    </div>
  );
}

export default Header;
