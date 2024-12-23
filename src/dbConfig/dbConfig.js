import mongoose from "mongoose";
export async function connect() {
  try {
    console.log("MongoDB URI:", process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongogb connected!");
    });
    connection.on("error", (err) => {
      console.log("Mongogb connection error!", err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong");
    console.log(error);
  }
}
