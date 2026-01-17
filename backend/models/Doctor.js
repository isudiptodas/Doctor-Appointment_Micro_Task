import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema({
  name: {type: string, required: true},
  email: {type: string, required: true},
  password: {type: string, required: true},
  hospital: {type: string, required: true},
  speciality: {type: string, required: true},
  verified: {type: boolean, required: false, default: false},
  created: {type: Date, required: false, default: Date.now}
});

export const Doctor = mongoose.model('Doctor', doctorSchema);
