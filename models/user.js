const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true,
        min: 0
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;