import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AppModalSensor from "../modals/ModalSensor";

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

export default function TableSensor() {
  const [data, setData] = React.useState([
    {
      data: [
        {
          id: 0,
          name: "default",
          category: "sensor",
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
                  return data.category === "sensor" ? (
                    <StyledTableRow key={data.id}>
                      <StyledTableCell component="th" scope="row">
                        {data.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {data.status === true ? "Ligado" : "Desligado"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <div className="flex flex-row gap-4 justify-end items-end">
                          <CreateIcon />
                          <AppModalSensor
                            button={<VisibilityIcon />}
                            deviceId={data.id}
                          />
                          <DeleteIcon />
                        </div>
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
}
