const dotenv = require('dotenv');

// load config file
dotenv.config({ path: './config/config.env' });
const MongoDBURI = process.env.Mongo_URI;
console.log(MongoDBURI);