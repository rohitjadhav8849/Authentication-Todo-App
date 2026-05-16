import API from "@/lib/axios";

export const signupUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await API.post("/auth/local/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export const signinUser = async (
  identifier: string,
  password: string
) => {
  const response = await API.post("/auth/local", {
    identifier,
    password,
  });

  return response.data;
};