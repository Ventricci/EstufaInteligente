import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AppModal from "../modals/ModalActuator";
import { TableContainer } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#A8C686",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F0F8EA",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface PropTypes {}

const TableActuator: React.FC<PropTypes> = ({}) => {
  const [data, setData] = React.useState([
    {
      data: [
        {
          id: 0,
          name: "default",
          category: "activation",
          status: true,
          deleted: false,
          serial: "default",
          greenhousesid: 0,
        },
      ],
      greenhouseId: 0,
    },
  ]);

  useEffect(() => {
    setInterval(() => {
      localStorage.getItem("devicesData") === null
        ? null
        : setData(JSON.parse(localStorage.getItem("devicesData")!));
    }, 5000);
  }, [localStorage.getItem("greenhouseId")]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        {data.map((data) => {
          if (
            data.greenhouseId === Number(localStorage.getItem("greenhouseId"))
          ) {
            return (
              <TableBody>
                {data.data.map((data) => {
                  return data.category === "activation" ? (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell component="th" scope="row">
                        {data.name}
                      </StyledTableCell>
                      {localStorage.getItem("active") === "true" ? (
                        <StyledTableCell align="right">
                          {localStorage.getItem("deviceStatus") === "true"
                            ? "Ligado"
                            : "Desligado"}
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="right">
                          {data.status === true ? "Ligado" : "Desligado"}
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="right">
                        <AppModal
                          button={<PlayArrowIcon />}
                          onClick={undefined}
                          id={data.id}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : null;
                })}
              </TableBody>
            );
          }
        })}
      </Table>
    </TableContainer>
  );
};

export default TableActuator;
