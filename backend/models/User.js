import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {type: string, required: true},
  email: {type: string, required: true},
  password: {type: string, required: true},
  created: {type: Date, required: false, default: Date.now}
});

export const User = mongoose.model('User', userSchema);
