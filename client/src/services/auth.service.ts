import api from "./api";

const handleError = (error: any, defaultMessage: string): never => {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error(defaultMessage);
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const { data } = await api.post("/auth/sign-up", { name, email, password });
    return data;
  } catch (error: any) {
    handleError(error, "An error occurred during sign-up.");
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data } = await api.post("/auth/sign-in", { email, password });
    return data;
  } catch (error: any) {
    handleError(error, "An error occurred during sign-in.");
  }
};
