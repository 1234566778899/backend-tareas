const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: String,
    lname: String,
    username: String,
    password: String,
    active: { type: Boolean, default: true }
}, {
    timestamps: true
})

module.exports = model('user', UserSchema)