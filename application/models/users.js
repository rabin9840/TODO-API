const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     unique: true
    // },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},
);


const User = mongoose.model('User', usersSchema);

module.exports = User;