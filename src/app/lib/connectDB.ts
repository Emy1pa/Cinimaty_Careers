import mongoose, { Connection } from "mongoose";
let cachedConnection: Connection | null = null;
export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }
  try {
    const cnx = await mongoose.connect(mongoURI);
    cachedConnection = cnx.connection;
    console.log("New mongodb connection established");
    return cachedConnection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
