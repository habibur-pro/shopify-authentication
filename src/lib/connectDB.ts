import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.DB_URL as string;
  console.log({ uri });
  try {
    await mongoose.connect(uri);
    console.log("DB_CONNECTED");
  } catch (error) {
    console.log(error);
    console.log("DB_CONNECTION FAILED");
  }
};
