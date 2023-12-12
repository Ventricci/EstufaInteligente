import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import App from "../../components/AreaChart";
import Actuator from "../../components/Actuator";
import Sensor from "../../components/Sensor";
import { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import MultipleSelect from "../../components/Select";

function DashboardScreen() {

  const { userGreenhouses, setStateActiveGreenhouseId } = useContext(AppContext);

  const handleOnChange = (greenhouseName: SelectChangeEvent<string>) => {
    greenhouseName.preventDefault();
    const greenhouseId = userGreenhouses.find(
      (greenhouse) => greenhouse.name === greenhouseName.target.value
    )?.id;
    if (greenhouseId) {
      setStateActiveGreenhouseId(greenhouseId);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-[#A8C686]">
        <Header />
        <div className="flex flex-row mt-6 gap-8">
          <SideBar />
          <div className="flex flex-col">
          <div className="flex flex-row align-middle justify-center items-center bg-[#F0F8EA] mb-8">
            <p className="p-8 text-[25px] font-sans font-bold">
              Selecione a estufa da qual deseja visualizar os dados: 
            </p>
            <MultipleSelect
              name={"Estufa"}
              select={userGreenhouses.map((greenhouse) => greenhouse.name)}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
            <App />
            <div className="flex flex-row gap-10">
              <Actuator />
              <Sensor />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardScreen;
