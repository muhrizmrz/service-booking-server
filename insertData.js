import mongoose from "mongoose";

import connectDB from "./src/config/db.js";
import { Branch, Category, Service, Worker } from "./src/models/model.js";

const insertData = async () => {
  await connectDB();

  try {
    // Insert Categories
    const categories = await Category.insertMany([
      { name: "Hair Services" },
      { name: "Spa Services" },
      { name: "Beauty Services" },
      { name: "Health & Wellness" },
    ]);
    console.log("Categories inserted:", categories);

    // Map category names to ObjectIds
    const categoryMap = categories.reduce((acc, cat) => ({ ...acc, [cat.name]: cat._id }), {});

    // Insert Services
    const services = await Service.insertMany([
      { name: "Haircut", category: categoryMap["Hair Services"], duration: 30 },
      { name: "Hair Coloring", category: categoryMap["Hair Services"], duration: 60 },
      { name: "Beard Trim", category: categoryMap["Hair Services"], duration: 15 },
      { name: "Facial", category: categoryMap["Beauty Services"], duration: 45 },
      { name: "Manicure", category: categoryMap["Beauty Services"], duration: 40 },
      { name: "Pedicure", category: categoryMap["Beauty Services"], duration: 50 },
      { name: "Full Body Massage", category: categoryMap["Spa Services"], duration: 90 },
      { name: "Foot Massage", category: categoryMap["Spa Services"], duration: 45 },
      { name: "Body Scrub", category: categoryMap["Spa Services"], duration: 60 },
      { name: "Acupuncture", category: categoryMap["Health & Wellness"], duration: 60 },
      { name: "Chiropractic", category: categoryMap["Health & Wellness"], duration: 60 },
      { name: "Physiotherapy", category: categoryMap["Health & Wellness"], duration: 75 },
    ]);
    console.log("Services inserted:", services);

    // Map service names to ObjectIds
    const serviceMap = services.reduce((acc, svc) => ({ ...acc, [svc.name]: svc._id }), {});

    // Insert Branches
    const branches = await Branch.insertMany([
      { name: "Nadapuram", services: [serviceMap["Haircut"], serviceMap["Hair Coloring"], serviceMap["Beard Trim"]] },
      { name: "Thalipparamba", services: [serviceMap["Hair Coloring"], serviceMap["Beard Trim"], serviceMap["Manicure"]] },
      { name: "Calicut", services: [serviceMap["Facial"], serviceMap["Beard Trim"], serviceMap["Pedicure"]] },
    ]);
    console.log("Branches inserted:", branches);

    // Map branch names to ObjectIds
    const branchMap = branches.reduce((acc, branch) => ({ ...acc, [branch.name]: branch._id }), {});

    // Insert Workers
    const workers = await Worker.insertMany([
      { name: "John Doe", branch: branchMap["Nadapuram"], services: [{ service: serviceMap["Haircut"], price: 20 }] },
      { name: "Jane Smith", branch: branchMap["Nadapuram"], services: [{ service: serviceMap["Haircut"], price: 25 }, { service: serviceMap["Hair Coloring"], price: 50 }] },
      { name: "Mike Johnson", branch: branchMap["Calicut"], services: [{ service: serviceMap["Haircut"], price: 22 }] },
      { name: "Emma Davis", branch: branchMap["Thalipparamba"], services: [{ service: serviceMap["Hair Coloring"], price: 55 }] },
      { name: "Liam Brown", branch: branchMap["Nadapuram"], services: [{ service: serviceMap["Beard Trim"], price: 18 }] },
      { name: "Olivia Wilson", branch: branchMap["Calicut"], services: [{ service: serviceMap["Beard Trim"], price: 17 }] },
      { name: "Noah Martin", branch: branchMap["Nadapuram"], services: [{ service: serviceMap["Facial"], price: 40 }] },
      { name: "Sophia Garcia", branch: branchMap["Calicut"], services: [{ service: serviceMap["Facial"], price: 42 }] },
      { name: "Benjamin Clark", branch: branchMap["Thalipparamba"], services: [{ service: serviceMap["Manicure"], price: 30 }] },
      { name: "Henry Walker", branch: branchMap["Calicut"], services: [{ service: serviceMap["Full Body Massage"], price: 70 }] },
      { name: "Amelia Hall", branch: branchMap["Calicut"], services: [{ service: serviceMap["Full Body Massage"], price: 75 }] },
    ]);
    console.log("Workers inserted:", workers);

    console.log("Dummy data inserted successfully!");
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  } finally {
    mongoose.connection.close();
  }
};

insertData();
