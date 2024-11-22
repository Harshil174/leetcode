import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  await mongoose
    .connect(uri)
    .then(() => console.log("Successfully connect to MONGODB"))
    .catch((err) => console.log("Failed to connect to MONGODB:", err));
};
