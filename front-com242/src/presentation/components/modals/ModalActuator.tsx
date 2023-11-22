import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
  if (active === true) {
  setOpen(false);
  setActive(false);
  }
  };

  // estado que obriga o modal a esperar 10000ms antes de renderizar a resposta
  // isso da tempo para a requisicao bater no back e retornar para o front
  const [active, setActive] = React.useState(false);

  // estado associado a variavel deviceStatus da resposta da requisicao (usado para
  // atualizar os valores no useEffect)
  const [deviceStatus, setDeviceStatus] = React.useState(false);

  // estado associado a variavel successMessage da resposta da requisicao (usado para
  // mudar a mensagem no modal, de acordo com a resposta da requisicao)
  const [message, setMessage] = React.useState("Falha no Dispositivo");

  async function handleActive() {
    // ao clicar no botao e chamar a funcao, abre-se o modal
    setOpen(true);
     
    // seta 60000ms para que, apos esse tempo, a flag permita a resposta ser renderizada no modal
    setTimeout(() => setActive(true), 6000);

    await axios
      // requisicao post que passa a baseURL da requisicao, alem do id (recebido como prop)
      .post(`${baseURL}/${id}`, {})
      .then((response) => {
        // com a resposta da requisicao, seta-se os valores para os estados
        setDeviceStatus(response.data.deviceStatus);
        setMessage(response.data.successMessage);
        
        console.log(
          "CHANGE STATUS",
          response,
          "DEVICESTATUS",
          localStorage.getItem("deviceStatus")
        );
        localStorage.setItem("active", "true");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // useEffect usado para atualizar os valores active e deviceStatus, dentro do localStorage
  React.useEffect(() => {
    localStorage.setItem("deviceStatus", deviceStatus.toString());
  }, [active, deviceStatus]);

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
                {message === "O dispositivo permaneceu no mesmo status." ||
                message === "Falha no Dispositivo"
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
