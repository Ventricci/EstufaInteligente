import { Component } from "react";
import Logo from "../../assets/greenhouse.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popper from "./Popper";

export class Header extends Component {
  render() {
    return (
      <div className="w-auto h-[80px] bg-white flex flex-row justify-between">
        <div className="pl-8 flex flex-row items-center justify-center">
          <img className="w-[80px] h-[80px]" src={Logo} alt="React Logo" />
          <p className="text-[#8CC63E] font-sans text-[28px] ">
            Estufa Inteligente
          </p>
        </div>
        <div className="pl-8 flex flex-row items-center justify-center mr-14">
          <AccountCircleIcon
            style={{
              color: "black",
              width: "50px",
              height: "50px",
              marginRight:"9px",
            }}
          />
          <Popper/>
        </div>
      </div>
    );
  }
}

export default Header;
