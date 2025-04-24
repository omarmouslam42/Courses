const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected Successfully 🚀 ');
  } catch (err) {
    console.error(err.message , " Fail To Connect o Database ❌ ");
    process.exit(1);
  }
};

module.exports = connectDB;
