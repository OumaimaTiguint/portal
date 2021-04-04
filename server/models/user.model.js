const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 2
    },
    role: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minLength: 2
    },
    active: {
        type: Boolean,
        required: true
    }
},
{
    timestamps: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;