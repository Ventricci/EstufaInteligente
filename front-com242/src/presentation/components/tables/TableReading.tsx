import * as React from "react";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import DatePickerApp from "../DatePicker";
import axios from "axios";
import { format } from "date-fns";

const baseURL = "http://localhost:3000/readings/latest";

interface PropsTypes {
  deviceId: number;
}
const TableRead: React.FC<PropsTypes> = ({ deviceId }) => {
  // definicao padrao da biblioteca para renderizar a table
  const [page, setPage] = React.useState(0);

  // definicao padrao da biblioteca para renderizar a table
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // estado para pegar a data inicial
  const [initial, setInitial] = React.useState<Date>();

  // estado que define uma flag, essencial para esperar os valores
  // vindos do backend
  const [render, setRender] = React.useState(false);

  // estado que recebe todos os dados de leitura da requisicao do backend
  const [readingRows, setReadingsRows] = React.useState<any[]>([]);

  // estado para alterar entre medida Temperatura e medida Umidade
  const [measure, setMeasure] = React.useState(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // funcao que chama a requisicao para pegar as ultimas leituras de temperatura
  function handleTableDataTemperature() {
    // setando measure para true
    setMeasure(true);

    // requisicao get para pegar as ultimas leituras de temperatura desde uma data inicial
    axios
      .get(
        `${baseURL}/${deviceId}/temperature/${format(
          initial as Date,
          "yyyy-MM-dd'T'HH:mm:ss"
        )}`
      )
      .then((response) => {
        console.log(response.data);

        // populando a variavel readingRows com a resposta da requisicao
        setReadingsRows(response.data);

        // console.log() para mostrar as leituras
        console.log("readings", readingRows[0]);

        // setando um setTimeout que, ao acabar o tempo, renderizará a tabela
        setTimeout(() => {
          setRender(true);
          console.log(readingRows);
        }, 3000);
      });
  }

  // funcao que chama a requisicao para pegar as ultimas leituras de umidade
  function handleTableDataHumidity() {
    // setando measure para false
    setMeasure(false);

    // requisicao get para pegar as ultimas leituras de umidade desde uma data inicial
    axios
      .get(
        `${baseURL}/${deviceId}/humidity/${format(
          initial as Date,
          "yyyy-MM-dd'T'HH:mm:ss"
        )}`
      )
      .then((response) => {
        console.log(response.data);

        // populando a variavel readingRows com a resposta da requisicao
        setReadingsRows(response.data);

        // console.log() para mostrar as leituras
        console.log("readings", readingRows[0]);

        // setando um setTimeout que, ao acabar o tempo, renderizará a tabela
        setTimeout(() => {
          setRender(true);
          console.log(readingRows);
        }, 3000);
      });
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - readingRows.length) : 0;

  // useEffect para atualizar as leituras no array readingRows, sempre que o render (flag para renderizar a tabela)
  // for true
  React.useEffect(() => {
    readingRows;
  }, [render]);

  return (
    <Root sx={{ maxWidth: "100%", width: 500 }}>
      <div className="flex items-center justify-center flex-col">
        <div className="flex w-full text-[23px] font-bold font-sans justify-center items-center flex-col">
          <h2>Leituras</h2>

          <DatePickerApp
            selected={initial!}
            onChange={(newValue) => {
              setInitial(newValue);
            }}
            label={"Data inicial"}
            width={"150px"}
          />
          <div className="flex flex-row gap-4 m-2">
            <a
              className="bg-gray-200 rounded-lg p-2 cursor-pointer"
              onClick={handleTableDataTemperature}
            >
              temperatura
            </a>
            <a
              className="bg-gray-200 rounded-lg p-2 cursor-pointer"
              onClick={handleTableDataHumidity}
            >
              umidade
            </a>
          </div>
        </div>

        {render ? (
          <table aria-label="custom pagination table">
            <thead>
              <tr>
                <th>Data Última Leitura</th>
                <th>{measure === true ? "Temperatura" : "Umidade"}</th>
              </tr>
            </thead>
            <tbody>
              {(rowsPerPage > 0
                ? readingRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : readingRows
              ).map((row) => {
                return (
                  <tr key={row.datetime}>
                    <td>{row.datetime}</td>
                    <td style={{ width: 160 }} align="right">
                      {row.value}
                    </td>
                  </tr>
                );
              })}
              {emptyRows > 0 && (
                <tr style={{ height: 41 * emptyRows }}>
                  <td colSpan={3} aria-hidden />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={readingRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </tr>
            </tfoot>
          </table>
        ) : null}
      </div>
    </Root>
  );
};

export default TableRead;

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  `
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
