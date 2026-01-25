import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema({
  name: {type: string, required: true},
  email: {type: string, required: true},
  password: {type: string, required: true},
  hospital: {type: string, required: false},
  speciality: {type: string, required: false},
  gender: {type: string, required: false},
  verified: {type: boolean, required: false, default: false},
  created: {type: Date, required: false, default: Date.now}
});

export const Doctor = mongoose.model('Doctor', doctorSchema);
