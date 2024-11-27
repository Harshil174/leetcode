import api from "./api";

const handleError = (error: any, defaultMessage: string): never => {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error(defaultMessage);
  }
};

export const getProblemById = async (problemId: string) => {
  try {
    const { data } = await api.get(`/problem/${problemId}`);
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch the problem");
    }
    return data;
  } catch (err) {
    handleError(err, "An unexpected error occurred, Please try again later");
  }
};
