import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // || "mongodb://localhost:27017/security_booking"
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/security_booking", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

export default connectDB;
