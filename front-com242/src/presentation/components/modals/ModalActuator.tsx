import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

const baseURL = "http://localhost:3000/actuation";

const style = {
  position: "absolute" as const,
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
  onClick?: void;
  id: number;
}

const AppModal: React.FC<PropTypes> = ({ button, id }) => {

  const { token, setStateActive, active } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [isActuated, setIsActuated] =useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setStateActive(false);
    setMessage("");
  };


  async function handleActive() {
    // ao clicar no botao e chamar a funcao, abre-se o modal
    setOpen(true);

    setTimeout(() => {
      handleClose();
    }, 7000);

    await axios
      // requisicao post que passa a baseURL da requisicao, alem do id (recebido como prop)
      .post(`${baseURL}/${id}`, {}, {
        headers: {
          Authorization: token},
        },
      )
      .then((response) => {
        setIsActuated(response.data.success);
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        window.alert("Erro ao enviar a requisição");
      });
  }

  useEffect(() => {
    if (message !== "") setStateActive(true);
    else setStateActive(false);
  }, [message, setStateActive]);

  useEffect(() => {
    console.log(`Token: ${token}`);
  }, [token]);

  return (
    <div>
      <a onClick={handleActive} className="cursor-pointer">
        {button}
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Caso o active retorne true, renderiza-se o primeiro Typography.
          caso contrário, o segundo.
          */}
          {active ? (
            // Logica usada para renderizar diferentes menssagens, de acordo com
            // as diferentes respostas da requisicao
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {isActuated === false
                  ? "Atenção!"
                  : "Sucesso!"}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {message}
              </Typography>
            </>
          ) : (
            // mensagem exibida assim que o modal eh aberto
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Aguarde!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                A requisição está sendo enviada ao dispositivo
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AppModal;
