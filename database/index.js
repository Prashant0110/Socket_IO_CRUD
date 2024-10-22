const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:root@cluster0.sydo0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("its connected!");
};

module.exports = connectToDatabase;
