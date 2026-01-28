import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
  patientName: {type: String, required: true},
  patientEmail: {type: String, required: true},
  doctorName: {type: String, required: true},
  doctorEmail: {type: String, required: true},
  appointmentDate: {type: Date, required: true},
  timeSlot: {type: String, required: true},
  created: {type: Date, required: false, default: Date.now}
});

export const Booking = mongoose.model('Booking', bookingSchema);
 