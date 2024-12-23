import mongoose from "mongoose";

let isConnected = false; // Keep track of whether we're connected

export async function connect() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    // Connect to the database only if not already connected
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("MongoDB connection error!", error);
    process.exit(1); // Exit process if the connection fails
  }
}
