import { Component } from "react";
import TableSensor from "./tables/TableSensor";

export class Sensor extends Component {
  render() {
    return (
      <div className="w-[930px] h-[350px] bg-white flex flex-col mt-6">
        <p className="p-4 text-[25px] font-sans font-bold ">Sensores Ativos</p>
        <TableSensor />
      </div>
    );
  }
}

export default Sensor;
