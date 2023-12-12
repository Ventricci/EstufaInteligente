import { TextField, InputAdornment, Button, styled, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
// importar um ícone redondo de um usuário
import AccountCircle from "@mui/icons-material/AccountCircle";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import * as zod from 'zod'
import { useLayoutEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

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

const userFormValidationSchema = zod.object({
  name: zod.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  email: zod.string().email({ message: 'Email inválido' }),
  cpf: zod.string().min(11, { message: 'CPF deve ter no mínimo 11 caracteres' }),
  password: zod.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

interface IUserDataRemote {
    id: number;
    name: string;
    cpf: string;
    email: string;
    pass: string;
    role:   "Administrator" | "Client";
    photo: string | null;
}

type UserFormType = zod.infer<typeof userFormValidationSchema>

function Profile() {

  const { UserApiData, token } = useContext(AppContext)

  const [wasGetUser, setWasGetUser] = useState<boolean>(false)
  const [userDataRemote, setUserDataRemote] = useState<IUserDataRemote | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const userForm = useForm<UserFormType>({
    resolver: zodResolver(userFormValidationSchema),
    values: {
      name: userDataRemote?.name || '',
      email: userDataRemote?.email || '',
      cpf: userDataRemote?.cpf || '',
      password: userDataRemote?.pass || '',
    }
  })

  const { handleSubmit, register } = userForm

  const canSubmit = useMemo(() => {
    // se o formulário não foi alterado, não pode submeter
    if (!userForm.formState.isDirty) return false
    // se o formulário não é válido, não pode submeter
    if (!userForm.formState.isValid) return false
    
    return true
  }, [userForm.formState.isDirty, userForm.formState.isValid])

  const onSubmit = async (userData: UserFormType) => {
    const result = await axios.put(`http://localhost:3000/users/profile/${UserApiData.id}`, userData, {
      headers: {
        Authorization: token,
      }
    })
    const data = result.data
    alert(data.successMessage ? data.successMessage : data.errorMessage)
    setWasGetUser(false)
  }

  useLayoutEffect(() => {
     async function getUser () {
      const response = await axios.get(`http://localhost:3000/users/profile/${UserApiData.id}`, {
        headers: {
          Authorization: token,
        }
      })
      const data = response.data
      setUserDataRemote(data)
    }
    if (!wasGetUser) {
      getUser()
      setWasGetUser(true)
    }
  }, [UserApiData.id, token, wasGetUser])

  return(
    <>
      <div className="w-screen h-screen bg-[#A8C686]">
        <Header />
        <div className="flex flex-row mt-6 gap-8">
          <SideBar />
          <div className="flex flex-col w-full w-10/12 bg-[#ffffff] p-10">
            <h1 className="text-[#000000] font-sans text-[40px] pl-8">
              Editar Perfil</h1>
            <div className="flex flex-row">
              <div className="
              flex
              flex-col
              flex-2
              border-[3px]
              border-[#A8C686]
              rounded-[8px]
              w-[90%]
              h-auto
              mt-2
              ml-8
              p-4">
                <h2 className="text-[#000000] font-sans text-[30px] pl-8 mt-4">Dados Pessoais</h2>
                <form className="grid grid-cols-3 gap-4" action="" onSubmit={handleSubmit(onSubmit)}>
                  <CssTextField
                    className="w-auto"
                    label="Nome Completo"
                    InputLabelProps={{
                      style: {
                        color: "#8CC63E",
                      },
                      shrink: true,
                    }}
                    {...register('name')}
                  />
                  <CssTextField
                    className="w-auto"
                    label="Email"
                    InputLabelProps={{
                      style: {
                        color: "#8CC63E",
                      },
                      shrink: true,
                    }}
                    {...register('email')}
                  />
                  <CssTextField
                    className="w-auto"
                    label="CPF"
                    InputLabelProps={{
                      style: {
                        color: "#8CC63E",
                      },
                      shrink: true,
                    }}
                    {...register('cpf')}
                  />
                  <CssTextField
                    label="Senha"
                    id="outlined-start-adornment"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
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
                      shrink: true,
                    }}
                    {...register('password')}
                  />
                  <Button
                    className="justify-self-end col-span-3"
                    variant="contained"
                    style={{ 
                      backgroundColor: "#8CC63E",
                      color: "#ffffff",
                      opacity: canSubmit ? 1 : 0.5,
                      cursor: canSubmit ? 'pointer' : 'not-allowed'
                    }}
                    type="submit"
                    disabled={!canSubmit}
                  >
                    Salvar Alterações
                  </Button>
                </form>
              </div>
              <div className="flex flex-1 border-[3px] border-[#A8C686] rounded-[8px] w-[90%] h-auto justify-center items-center mt-2 ml-8 p-4">
                <AccountCircle
                  style={{
                    color: "#5e5e5e",
                    opacity: "0.5",
                    width: "150px",
                    height: "150px",
                  }}
                />
                <p className="text-[#000000] font-sans text-[30px] absolute">Nova Foto</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;
