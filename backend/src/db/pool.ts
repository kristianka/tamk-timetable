const mongoose = require("mongoose");

const pool = mongoose.createConnection("mongodb://localhost:27017/timetables_db", {
  authSource: "admin",
  user: "admin",
  pass: "password",
  maxPoolSize: 10
});

module.exports = pool;