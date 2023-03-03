//user schema
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  avatar: { type: String, required: true},
  allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property'}],
});

//model
const userModel = mongoose.model('User', UserSchema);

export default userModel;