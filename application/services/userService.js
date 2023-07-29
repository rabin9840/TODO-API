const Users = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const createUser = async (username, email, password) => {

    // const existingId = await Users.findById(_id);
    // if (existingId) {
    //     throw new Error('User id already exists');
    // }

    console.log("inside service");
    console.log(username, email, password);
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const existingEmail = await Users.findOne({ email });
    if (existingEmail) {
        throw new Error('Email already exists');
    }


    const hahsedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
        // _id,
        username,
        email,
        password: hahsedPassword
    });
    await newUser.save();
    return newUser;

}

module.exports = {
    createUser
}