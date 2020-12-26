const mongoose = require("mongoose");

require("dotenv").config();

const MONGOURI = process.env.MONGO_SECRET;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to DB.");
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
