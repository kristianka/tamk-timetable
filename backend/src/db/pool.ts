import { MongoClient } from 'mongodb'

//require('dotenv').config();


const mongoUri = 'mongodb://admin:password@localhost:27017/timetables_db';
const mongoClient = new MongoClient(mongoUri, {
  poolSize: {
      minPoolSize: 1,
      maxPoolSize: 10,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = mongoClient;
