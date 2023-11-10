import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import MultipleSelect from "./Select";
import Button from "@mui/material/Button";

const data = [
  {
    name: "Janeiro",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Fevereiro",
    uv: 3000,
    pv: 2400,
    amt: 2210,
  },
  {
    name: "Março",
    uv: 2000,
    pv: 2400,
    amt: 2290,
  },
  {
    name: "Abril",
    uv: 2780,
    pv: 2400,
    amt: 2000,
  },
  {
    name: "Maio",
    uv: 1890,
    pv: 2400,
    amt: 2181,
  },
  {
    name: "Junho",
    uv: 2390,
    pv: 2400,
    amt: 2500,
  },
  {
    name: "Julho",
    uv: 3490,
    pv: 2400,
    amt: 2100,
  },

  {
    name: "Agosto",
    uv: 3490,
    pv: 2400,
    amt: 2100,
  },
  {
    name: "Setembro",
    uv: 3490,
    pv: 2400,
    amt: 2100,
  },
  {
    name: "Outubro",
    uv: 3490,
    pv: 2400,
    amt: 2100,
  },
  {
    name: "Novembro",
    uv: 3490,
    pv: 2400,
    amt: 2100,
  },
  {
    name: "Dezembro",
    uv: 3490,
    pv: 2400,
    amt: 2100,
  },
];

export default function App() {
  return (
    <div className="bg-white h-[600px] w-[1900px] flex flex-row justify-center items-center">
      <div className="flex flex-col">
        <h2 className="p-8 text-[25px] font-sans font-bold">
          Média de variação das condições da estufa
        </h2>
        <AreaChart
          width={1500}
          height={500}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#A3CEF1" fill="#A3CEF1" />
          <Area type="monotone" dataKey="pv" stroke="#db1616" fill="none" />
        </AreaChart>
      </div>
      <div className="flex flex-col">
        <MultipleSelect name={"Estufa"} select={['Estufa 1', 'Estufa 2', 'Estufa 3']} />
        <MultipleSelect name={"Grandeza"} select={['Temperatura', 'Umidade']} />
        <MultipleSelect name={"Data Inicial"} select={['01/11/2023']} />
        <MultipleSelect name={"Data Final"} select={['03/11/2023']} />
        <Button variant="contained">Mostrar no gráfico</Button>
      </div>
    </div>
  );
}
