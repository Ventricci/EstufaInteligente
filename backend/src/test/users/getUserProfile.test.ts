import axios from "axios";

test("Deve retornar os dados do usuário", async () => {
  const userLoginInput = {
    email: "guto@email.com",
    pass: "123456789",
  };

  const loginResponse = await axios.post(
    "http://localhost:3000/users/signin",
    userLoginInput
  );

  expect(loginResponse.status).toBe(200);

  const token = loginResponse.data.token;
  const userId = loginResponse.data.id;

  const getUserProfileResponse = await axios.get(
    `http://localhost:3000/users/profile/${userId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const userProfile = getUserProfileResponse.data;

  // output esperado:
  /*
    id: number;
    name: string;
    cpf: string;
    email: string;
    pass: string;
    role: $Enums.Users_Role;
    photo: string | null;
    deleted: boolean;
   */

  expect(userProfile).toHaveProperty("id");
  expect(userProfile).toHaveProperty("name");
  expect(userProfile).toHaveProperty("cpf");
  expect(userProfile).toHaveProperty("email");
  expect(userProfile).toHaveProperty("pass");
  expect(userProfile).toHaveProperty("role");
  expect(userProfile).toHaveProperty("photo");
  expect(userProfile).toHaveProperty("deleted");

  expect(userProfile.email).toBe(userLoginInput.email);
  expect(userProfile.pass).toBe(userLoginInput.pass);
});
