import React, { useContext } from "react";
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
import { AppContext } from "../../../context/AppContext";

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


const TableActuator = () => {
  const { devicesData, activeGreenhouseId, active, deviceStatus } = useContext(AppContext);

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
        <TableBody>
        {devicesData.map((device) => {
          if (
            device.greenhousesid === activeGreenhouseId
          ) {
            return (
              device.category === "activation" ? (
                <StyledTableRow key={device.id}>
                  <StyledTableCell component="th" scope="row">
                    {device.name}
                  </StyledTableCell>
                  {active === true ? (
                    <StyledTableCell align="right">
                      {deviceStatus === true
                        ? "Ligado"
                        : "Desligado"}
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="right">
                      {device.status === true ? "Ligado" : "Desligado"}
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="right">
                    <AppModal
                      button={<PlayArrowIcon />}
                      onClick={undefined}
                      id={device.id}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ) : null
            );
          }
        })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableActuator;
