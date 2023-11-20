import Logo from "../../assets/greenhouse.png";
import TextField from "@mui/material/TextField";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./card.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL = "https://tame-tuna-apron.cyclic.app/users/signin";
const baseUrlDevices = "https://tame-tuna-apron.cyclic.app/devices/list";
const ColorButton = styled(Button)<ButtonProps>(({}) => ({
  color: "#ffffff",
  backgroundColor: "#A8C686",
  "&:hover": {
    backgroundColor: "#A8C686",
  },
}));

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#A8C686",
    },
    "& label.Mui-focused": {
      color: "#A8C686",
    },
    "&:hover fieldset": {
      borderColor: "#A8C686",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#A8C686",
    },
  },
  "& .MuiFormLabel-root": {
    color: "#A8C686",
  },
  "& .MuiFormControlLabel-label": {
    color: "#A8C686",
  },
});

function Card() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // interface criada para facilitar o manuseio dos dados do usuario
  // na hora de realizar o POST de login
  interface UserLogin {
    email: string;
    pass: string;
  }

  // estado usado para armazenar as informacoes do usuario e requisitar o login no post
  const [data, setData] = React.useState<Partial<UserLogin>>({});

  const handleLogin = () => {
    // obriga o usuario a preencher os dois campos: email e senha
    if (Object.values(data).length !== 2) {
      window.alert("Preencha todos os campos.");
    } else {
      // realiza uma requisicao post com os dados armazenados em data
      axios
        .post(baseURL, {
          email: data.email,
          pass: data.pass,
        })
        .then(function (response) {
          // apos obter a resposta da requisicao, salva os dados no localStorage, na variavel apiData
          // esses dados serao usados para renderizar as opcoes de estufa, alem do nome associado ao usuario logado
          localStorage.setItem("apiData", JSON.stringify(response.data));

          console.log(response.data.greenhouses);

          let devicesData: any[] = [];

          // funcao feita para armazenar os dados da estufa associadas ao usuario
          response.data.greenhouses.map((data: any) => {
            // apos o map, requisita um get para cada estufa associada ao usario
            axios.get(`${baseUrlDevices}/${data}`).then((res) => {
              // entao, faz-se um push das informacoes para devicesData
              devicesData.push({ data: res.data, greenhouseId: data });

              // chama-se a funcao stringify, pois o localStorage so armazena strings
              localStorage.setItem("devicesData", JSON.stringify(devicesData));

              console.log(
                "local",
                JSON.parse(localStorage.getItem("devicesData")!)
              );
            });
          });

          // caso o codigo chegue ate aqui, o usuario eh logado
          window.alert("Logado com sucesso!");
          console.log(response);

          // e eh enviado para a dashboard
          if (response.data.auth) {
            navigate("/dashboard");
          }
        })
        .catch(function (error) {
          window.alert(error);
          console.log(error);
        });
    }
  };

  return (
    <div className="w-[550px] h-[550px] bg-white flex flex-col rounded-[20px] shadow-xl">
      <div className="pl-8 flex flex-row items-center justify-center">
        <img className="w-[80px] h-[80px]" src={Logo} alt="React Logo" />
        <p className="text-[#8CC63E] font-sans text-[28px] ">
          Estufa Inteligente
        </p>
      </div>
      <div className="pl-8 pr-8 mt-8">
        <p className="text-[24px] font-sans font-bold">Entrar</p>
        <p className="text-[20px] font-sans text-[#21212180] mt-2">
          Por favor, insira suas credenciais.
        </p>
        <div className="mt-4">
          {/* os dois CssTextFields abaixo passam, atraves do onChange, as informacoes nessecarias
          para realizar-se a requisicao POST (que, alem de fazer o login, retorna os dados das estufas
            do usuario. )
          */}
          <CssTextField
            fullWidth
            id="outlined-search"
            label="Email"
            type="search"
            onChange={(res) => setData({ ...data, email: res.target.value })}
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
        </div>
        <div className="mt-4">
          <CssTextField
            label="Senha"
            fullWidth
            id="outlined-start-adornment"
            onChange={(res) => setData({ ...data, pass: res.target.value })}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <a
            className="text-[20px] font-sans font-bold text-[#A8C686] cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Não possui uma conta?
          </a>
          <ColorButton variant="contained" onClick={handleLogin}>
            Entrar
          </ColorButton>
        </div>
      </div>
    </div>
  );
}

export default Card;
