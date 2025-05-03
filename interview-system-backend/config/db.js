const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string from .env
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
