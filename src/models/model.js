import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

const categorySchema = new mongoose.Schema({
  name: String,
});

const serviceSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
  duration: Number, // in minutes
  availableWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Worker" }],
});

const workerSchema = new mongoose.Schema({
  name: String,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  services: [{ service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }, price: Number }],
});

export const Branch = mongoose.model("Branch", branchSchema);
export const Category = mongoose.model("Category", categorySchema);
export const Service = mongoose.model("Service", serviceSchema);
export const Worker = mongoose.model("Worker", workerSchema);
