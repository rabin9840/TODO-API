const express= require('express');
const dotenv = require('dotenv');

//Load config file
dotenv.config({path:'./config/config.env'});
const app= express();
const port = process.env.PORT;


app.use(express.json());

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})