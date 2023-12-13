import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TableRead from "../tables/TableReading";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface PropTypes {
  button: React.ReactElement;
  deviceId: number;
}

const AppModalSensor: React.FC<PropTypes> = ({ button, deviceId }) => {
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
          <div className="items-center justify-center flex">
            <TableRead deviceId={deviceId} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AppModalSensor;
