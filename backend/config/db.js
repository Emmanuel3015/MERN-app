import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://emmanuelmwangi310:Ratchet254@cluster0.hu5nbao.mongodb.net/food-del"
    )
    .then(() => console.log("DB connected successfully"));
};
