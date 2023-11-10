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
          <CssTextField
            fullWidth
            id="outlined-search"
            label="Nome"
            type="search"
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
          <ColorButton variant="contained" onClick={() => navigate("/signin")}>
            Registrar
          </ColorButton>
        </div>
      </div>
    </div>
  );
}

export default CardRegister;
