import mongoose from "mongoose";

let isConnected = false; // To track the connection state

export async function connect() {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to MongoDB");
  }
}
