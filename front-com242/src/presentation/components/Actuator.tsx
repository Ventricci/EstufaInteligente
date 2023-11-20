import TableActuator from "./tables/TableActuator";

const Actuator: React.FC = () => {
  return (
    <div className="w-[930px] h-[350px] bg-white flex flex-col mt-6">
      <p className="p-4 text-[25px] font-sans font-bold">Atuadores Ativos</p>

      <TableActuator />
    </div>
  );
};

export default Actuator;
