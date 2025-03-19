import mongoose from "mongoose";


const BookingSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  services: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
      worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
      price: Number,
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
  address: {
    streetAddress: String,
    district: String,
    state: String,
    postalCode: String,
  },
  serviceRemarks: String
});

export const Booking = mongoose.model("Booking", BookingSchema);