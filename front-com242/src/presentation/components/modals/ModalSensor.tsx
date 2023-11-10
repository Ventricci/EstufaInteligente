import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TableRead from "../tables/TableReading";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface PropTypes {
  button: React.ReactElement;
}

const AppModalSensor: React.FC<PropTypes> = ({ button }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    if (active === true) {
      setOpen(false);
      setActive(false);
    }
  };

  const [active, setActive] = React.useState(false);

  function handleActive() {
    setActive(true);
  }

  console.log("Flag", active);

  return (
    <div>
      <a
        onClick={() => {
          setOpen(true);
          setTimeout(handleActive, 5000);
        }}
        className="cursor-pointer"
      >
        {button}
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableRead />
        </Box>
      </Modal>
    </div>
  );
};

export default AppModalSensor;
