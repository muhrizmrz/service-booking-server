import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { Branch, Category, Service, Worker } from "./src/models/model.js";
import mongoose from "mongoose";
import { Booking } from "./src/models/booking.js";

import "dotenv/config"

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/api/branch", async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json(branches);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
});

app.get("/api/category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
});

app.get("/api/services", async (req, res) => {
  try {
    const { branchId, categoryId } = req.query;
    const branch = await Branch.findById(branchId);
    const services = await Service.find({
      _id: { $in: branch.services },
      category: categoryId,
    });
    res.status(200).json(services);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
});

app.get("/api/staffs", async (req, res) => {
  try {
    const { branchId, serviceId } = req.query;
    const staffs = await Worker.find({
      branch: branchId,
      "services.service": serviceId,
    });
    const formattedWorkers = staffs.map((worker) => {
      const service = worker.services.find(
        (s) => s.service.toString() === serviceId
      );
      return {
        _id: worker._id,
        name: worker.name,
        price: service ? service.price : 0,
      };
    });
    res.status(200).json(formattedWorkers);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
});

app.post("/api/book-service", async (req, res) => {
    console.log("Req body", req.body);
    
  const { services, address } = req.body;
  try {
    const item = await Booking.create({
      customer: address.fullName,
      mobile: address.mobile,
      email: address.email,
      services,
      address: {
        streetAddress: address.streetAddress,
        district: address.district,
        state: address.state,
        postalCode: address.postalCode,
      },
      serviceRemarks: address.serviceRemarks,
    });
    res.status(200).json(item)
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
