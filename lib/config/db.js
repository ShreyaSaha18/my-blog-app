import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shreyaasahaa0_db_user:Ls5rGGnAVR0svS1G@cluster0.kabafye.mongodb.net/next-blog-app",
  );
  console.log("MongoDB Connected Successfully!");
};

