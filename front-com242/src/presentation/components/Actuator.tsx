import { Component } from "react";
import TableActuator from "./tables/TableActuator";
export class Actuator extends Component {
  render() {
    return (
      <div className="w-[930px] h-[350px] bg-white flex flex-col justify-between mt-6">
        <p className="p-4 text-[25px] font-sans font-bold ">Atuadores Ativos</p>
        <TableActuator />
      </div>
    );
  }
}

export default Actuator;
