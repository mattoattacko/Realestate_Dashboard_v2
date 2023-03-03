import mongoose from 'mongoose'; //modeling library for MongoDB. Lets us make models and schemas more easily

const connectDB = (url) => {
  mongoose.set('strictQuery', true); //this is to prevent the deprecation warning

  mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));
}

export default connectDB;