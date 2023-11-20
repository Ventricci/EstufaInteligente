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
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import states from "../../models/states/states";
import axios from "axios";

const baseURL = "https://tame-tuna-apron.cyclic.app/users/signup";

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

function CardRegister() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // interface criada para facilitar o manuseio dos dados do usuario
  // na hora de realizar o POST de signup
  interface User {
    name: string;
    cpf: string;
    email: string;
    pass: string;
    cep: string;
    street: string;
    houseNumber: number;
    district: string;
    city: string;
    state: string;
    adjunct: string;
  }

  // estado usado para armazenar as informacoes do usuario e requisitar o signup no post
  const [data, setData] = React.useState<Partial<User>>({});
  const [confirmPass, setConfirmPass] = React.useState("");

  const handleSubmit = () => {
    // condicao que obriga o usuario a preencher todos os campos
    if (Object.values(data).length !== 11) {
      window.alert("Preencha todos os campos.");
    } else if (data.pass !== confirmPass) {
      window.alert("Por favor, confirme sua senha.");
    } else {
      // requisicao post para fazer o registro do usuario
      axios
        .post(baseURL, {
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          pass: data.pass,
          cep: data.cep,
          street: data.street,
          houseNumber: data.houseNumber,
          district: data.district,
          city: data.city,
          state: data.state,
          adjunct: data.adjunct,
        })
        .then(function (response) {
          // caso tudo de certo, eh retornado um window.alert com a resposta
          window.alert(response);
          console.log(response);
        })
        .catch(function (error) {
          window.alert(error);
          console.log(error);
        });
    }
  };

  return (
    <div className="w-[720px] h-[720px] bg-white flex flex-col rounded-[20px] shadow-xl">
      <div className="pl-8 flex flex-row items-center justify-center">
        <img className="w-[80px] h-[80px]" src={Logo} alt="React Logo" />
        <p className="text-[#8CC63E] font-sans text-[28px] ">
          Estufa Inteligente
        </p>
      </div>
      <div className="pl-8 pr-8">
        <p className="text-[24px] font-sans font-bold">Entrar</p>
        <p className="text-[20px] font-sans text-[#21212180] mt-2">
          Entre com seus dados para utilizar a plataforma.
        </p>
        <div className="mt-4 flex flex-row gap-4">
          {/* todos os CssTextFields abaixo possuem um onChange com o codigo setData({ ...data, "ATRIBUTO": res.target.value })
          o "...data" representa todas as informacoes anteriores enquanto que o "ATRIBUTO" representa a informacao atual, presente
          no onChange
          */}
          <CssTextField
            fullWidth
            id="outlined-search"
            label="Nome"
            type="search"
            onChange={(res) => setData({ ...data, name: res.target.value })}
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
          <CssTextField
            fullWidth
            id="outlined-search"
            label="CPF"
            type="search"
            onChange={(res) => setData({ ...data, cpf: res.target.value })}
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
        </div>
        <div className="mt-4">
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
        <div className="mt-4 flex flex-row gap-4">
          <CssTextField
            label="Senha"
            fullWidth
            id="outlined-start-adornment"
            type={showPassword ? "text" : "password"}
            onChange={(res) => setData({ ...data, pass: res.target.value })}
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
          <CssTextField
            label="Confirmar Senha"
            fullWidth
            id="outlined-start-adornment"
            type={showPassword ? "text" : "password"}
            onChange={(res) => setConfirmPass(res.target.value)}
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
        <div className="mt-4 flex flex-row gap-4">
          <CssTextField
            fullWidth
            id="outlined-search"
            label="CEP"
            type="search"
            onChange={(res) => setData({ ...data, cep: res.target.value })}
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
          <CssTextField
            fullWidth
            id="outlined-search"
            label="Complemento"
            type="search"
            onChange={(res) => setData({ ...data, adjunct: res.target.value })}
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <CssTextField
            fullWidth
            id="outlined-search"
            label="Endereço"
            type="search"
            onChange={(res) => setData({ ...data, street: res.target.value })}
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
          <CssTextField
            fullWidth
            id="outlined-search"
            label="Bairro"
            onChange={(res) => setData({ ...data, district: res.target.value })}
            type="search"
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />

          <CssTextField
            id="outlined-search"
            label="Número"
            type="search"
            onChange={(res) =>
              setData({ ...data, houseNumber: Number(res.target.value) })
            }
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
        </div>
        <div className="mt-4 flex flex-row gap-4">
          <CssTextField
            fullWidth
            id="outlined-search"
            label="Cidade"
            onChange={(res) => setData({ ...data, city: res.target.value })}
            type="search"
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          />
          <CssTextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Estado"
            onChange={(res) => setData({ ...data, state: res.target.value })}
            InputLabelProps={{
              style: {
                color: "#8CC63E",
              },
            }}
          >
            {states.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </CssTextField>
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <a
            className="text-[20px] font-sans font-bold text-[#A8C686] cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Já possui uma conta?
          </a>
          {/* chama a funcao handleSubmit apos o evento onClick, que faz as requisicoes de post */}
          <ColorButton variant="contained" onClick={handleSubmit}>
            Registrar
          </ColorButton>
        </div>
      </div>
    </div>
  );
}

export default CardRegister;
