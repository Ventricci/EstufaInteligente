import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AppModal from "../modals/ModalActuator";

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

export default function TableActuator() {
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
          <StyledTableRow key={"name"}>
            <StyledTableCell component="th" scope="row">
              Irrigador
            </StyledTableCell>
            <StyledTableCell align="right">Ativo</StyledTableCell>
            <StyledTableCell align="right">
              <AppModal button={<PlayArrowIcon />} />{" "}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={"name"}>
            <StyledTableCell component="th" scope="row">
              Irrigador
            </StyledTableCell>
            <StyledTableCell align="right">Ativo</StyledTableCell>
            <StyledTableCell align="right">
              <AppModal button={<PlayArrowIcon />} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={"name"}>
            <StyledTableCell component="th" scope="row">
              Bomba de gotejamento
            </StyledTableCell>
            <StyledTableCell align="right">Inativo</StyledTableCell>
            <StyledTableCell align="right">
              <AppModal button={<PlayArrowIcon />} />{" "}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={"name"}>
            <StyledTableCell component="th" scope="row">
              Bomba de gotejamento
            </StyledTableCell>
            <StyledTableCell align="right">Inativo</StyledTableCell>
            <StyledTableCell align="right">
              <AppModal button={<PlayArrowIcon />} />{" "}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key={"name"}>
            <StyledTableCell component="th" scope="row">
              Bomba de gotejamento
            </StyledTableCell>
            <StyledTableCell align="right">Inativo</StyledTableCell>
            <StyledTableCell align="right">
              <AppModal button={<PlayArrowIcon />} />{" "}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
