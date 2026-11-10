const mongoose = require('mongoose');
const dns = require('dns');

// Force Node.js to use IPv4 DNS resolution first
dns.setDefaultResultOrder('ipv4first');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://mnareshsaidulu_db_user:5aXNw8Ye6u9t3DoX@ac-xitmrnt-shard-00-00.3caybwb.mongodb.net:27017,ac-xitmrnt-shard-00-01.3caybwb.mongodb.net:27017,ac-xitmrnt-shard-00-02.3caybwb.mongodb.net:27017/?ssl=true&replicaSet=atlas-rh1lir-shard-0&authSource=admin&appName=Cluster0');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;