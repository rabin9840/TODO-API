const dotenv = require('dotenv');
const mongoose = require('mongoose');
// load config file
dotenv.config();


const connectDB = async () => { 
    try {
        const dbConn = await mongoose.connect(process.env.Mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${dbConn.connection.host}`);
        
    } catch (error) {
        console.log('error during database connection: '+error);
        process.exit(1)
        
    }
}



// const MongoDBURI = process.env.Mongo_URI;
// console.log(MongoDBURI);

module.exports = connectDB;