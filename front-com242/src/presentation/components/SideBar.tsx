import { Component } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import House from "../../assets/Vector.png";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";

export class SideBar extends Component {
  render() {
    return (
      <div className="w-[200px] h-[980px] bg-white flex flex-col gap-20 ml-8">
        <div className="flex flex-col justify-center items-center border-b-2 border-black pb-8 ml-5 mr-5 mt-10">
          <div className="flex flex-col justify-center items-center cursor-pointer">
            <DashboardIcon
              style={{
                color: "black",
                width: "100px",
                height: "100px",
              }}
            />
            <p className="text-[23px] font-bold font-sans">Dashboard</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center border-b-2 border-black pb-8 ml-5 mr-5">
          <div className="flex flex-col justify-center items-center">
            <PersonIcon
              style={{
                color: "black",
                width: "100px",
                height: "100px",
              }}
            />
            <p className="text-[23px] font-bold font-sans">Perfil</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center border-b-2 border-black pb-8 ml-5 mr-5">
          <div className="flex flex-col justify-center items-center">
            <img className="w-[80px] h-[80px]" src={House} alt="React Logo" />
            <p className="text-[23px] font-bold font-sans">Estufas</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center  pb-8 ml-5 mr-5">
          <div className="flex flex-col justify-center items-center">
            <GrassOutlinedIcon
              style={{
                color: "black",
                width: "100px",
                height: "100px",
              }}
            />
            <p className="text-[23px] font-bold font-sans">Plantas</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
