require('dotenv').config();
const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    const mongoDBUri = process.env.MONGODB_URI;
    await mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection successful');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  }
}

connectToMongoDB();
