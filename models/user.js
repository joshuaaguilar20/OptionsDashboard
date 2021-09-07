
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    dob: {
        type: String,
        required: false,
    },
    stock: {
        type: Array,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;