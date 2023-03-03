import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  photo: { type: String, required: true },
  propertyType: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //we are referring it to the user that created it. A user can create many properties, but a property can only have one creator
});

//model
const propertyModel = mongoose.model('Property', PropertySchema);

export default propertyModel;