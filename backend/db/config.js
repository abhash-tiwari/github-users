import mongoose from "mongoose";

const config = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Mongo DB connected successfully");
  } catch (error) {
    console.log("Error in Connecting to MongoDB", error.message);
  }
};

export default config;