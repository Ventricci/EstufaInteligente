import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import App from "../../components/AreaChart";
import Actuator from "../../components/Actuator";
import Sensor from "../../components/Sensor";

function DashboardScreen() {
  return (
    <>
      <div className="w-screen h-screen bg-[#A8C686]">
        <Header />
        <div className="flex flex-row mt-6 gap-8">
          <SideBar />
          <div className="flex flex-col">
            <App />
            <div className="flex flex-row gap-10">
              <Actuator />
              <Sensor/>
            </div>
          </div>
        </div> 
      </div>
    </>
  );
}

export default DashboardScreen;
