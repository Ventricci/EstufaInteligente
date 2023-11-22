import React, { useEffect } from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
} from "recharts";
import MultipleSelect from "./Select";
import Button from "@mui/material/Button";
import axios from "axios";
import DatePickerApp from "./DatePicker";
import { format } from "date-fns";
import { SelectChangeEvent } from "@mui/material/Select";

const baseUrlIdeal = "http://localhost:3000/greenhouses/";
const baseUrlStatic = "http://localhost:3000/readings/interval";

export default function App() {
  // retorna as estufas disponiveis a partir do localStorage setado em Card
  const selectValues = JSON.parse(localStorage.getItem("apiData")!);
  // seta um estado para o Id do dispositivo
  const [deviceId, setDeviceId] = React.useState<number>();
  // seta um estado para a grandeza
  const [greatness, setGreatness] = React.useState<string>();
  // seta um estado para a data inicial
  const [initialDate, setInitialDate] = React.useState<Date>();
  // seta um estado para a data final
  const [finalDate, setFinalDate] = React.useState<Date>();
  // seta uma estado para os dados estaticos
  const [dataStatic, setDataStatic] = React.useState([{}]);
  // seta uma estado para a temperatura ideal
  const [idealTemperature, setIdealTemperature] = React.useState([{}]);
  // seta uma flag usado para logica de renderizacao do grafico
  const [average, setAverage] = React.useState(false);
  // seta um estado para implementar uma array de dados ideias (essenciais para fazer a linha media no grafico)
  const [idealTemperatureArray, setIdealTemperatureArray] = React.useState([
    {},
  ]);

  async function handleGenerateArea() {
    // limpa os valores da variavel idealTemperatureArray
    setIdealTemperatureArray([{}]);

    // realiza uma requisicao get para pegar a temperatura ideal
    axios.get(`${baseUrlIdeal}/${deviceId}`, {}).then((res) => {
      setIdealTemperature(res.data);
      console.log(idealTemperature[0]);
    });

    // realiza uma requisicao get para pegar os dados estaticos
    await axios
      .get(
        `${baseUrlStatic}/${deviceId}/${greatness}/${format(
          initialDate as Date,
          "yyyy-MM-dd'T'HH:mm:ss"
        )}/${format(finalDate as Date, "yyyy-MM-dd'T'HH:mm:ss")}`,
        {}
      )
      .then((response) => {
        // apos obter a resposta, seta os dados dinamicos
        setDataStatic(response.data[0].readings);

        // a seguir, ha uma logica necessaria para renderizar a linha media no grafico
        // o set abaixo popula o array idealTemperatureArray com o tamanho dos dados estaticos
        setIdealTemperatureArray(
          Array(dataStatic.length).fill(idealTemperature[0])
        );
        console.log(dataStatic);
      })
      .catch((error) => {
        console.log(error);
      });

    setAverage(true);
  }

  // useEffect contendo os dados que necessitam de atualizacao, para renderizacao "ao vivo" dos dados
  useEffect(() => {
    localStorage.setItem("greenhouseId", deviceId ? deviceId.toString() : "0");
    idealTemperature;
    dataStatic;
    idealTemperatureArray;
  }, [deviceId, average]);

  // const feito para atualizar o valor do deviceId, dependendo da escolha do usuario
  const handleOnChange = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setDeviceId(Number(e.target.value));
  };

  return (
    <div className="bg-white h-[600px] w-[1900px] flex flex-row justify-center items-center">
      <div className="flex flex-col">
        <h2 className="p-8 text-[25px] font-sans font-bold">
          Média de variação das condições da estufa
        </h2>
        <ComposedChart
          width={1500}
          height={500}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          data={dataStatic}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="datetime" />
          <YAxis domain={greatness === "temperature" ? [0, 35] : [0, 80]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#A3CEF1"
            fill="#A3CEF1"
          />
          <Area
            data={idealTemperatureArray}
            type="monotone"
            dataKey={
              greatness === "temperature" ? "idealtemperature" : "idealhumidty"
            }
            stroke="#db1616"
            fill="none"
            amplitude={20}
          />
        </ComposedChart>
      </div>
      <div className="flex flex-col">
        <MultipleSelect
          name={"Estufa"}
          select={selectValues.greenhouses}
          onChange={(e) => handleOnChange(e)}
        />
        <MultipleSelect
          name={"Grandeza"}
          select={["Temperatura", "Umidade"]}
          onChange={(e) => {
            // logica para setar o valor da grandeza, que passa como uma flag para a requisicao get
            if (e.target.value === "Temperatura") {
              setGreatness("temperature");
            } else if (e.target.value === "Umidade") {
              setGreatness("humidity");
            }
          }}
        />
        {/* setam os valores inicial e final, que passarao como flags para a requisicao get */}
        <DatePickerApp
          selected={initialDate!}
          onChange={(newValue) => setInitialDate(newValue)}
          label={"Data inicial"}
          width={"300px"}
        />
        <DatePickerApp
          selected={finalDate!}
          onChange={(newValue) => setFinalDate(newValue)}
          label={"Data final"}
          width={"300px"}
        />
        <div className="flex flex-col mt-4 w-[300px] gap-2 justify-center items-center">
          {/* no evento onClick, chama as requisicoes feitas dentro da funcao handleGenerateArea */}
          <Button
            variant="contained"
            style={{ width: "300px" }}
            onClick={() => handleGenerateArea()}
          >
            Mostrar no gráfico
          </Button>
        </div>
      </div>
    </div>
  );
}
