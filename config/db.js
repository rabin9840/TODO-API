const dotenv = require('dotenv');
const mongoose = require('mongoose');

const connectDB = async () => { 
    try {
        const dbConn = await mongoose.connect(process.env.Mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB connected: ${dbConn.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}

// load config file
dotenv.config({ path: './config/config.env' });
const MongoDBURI = process.env.Mongo_URI;
console.log(MongoDBURI);