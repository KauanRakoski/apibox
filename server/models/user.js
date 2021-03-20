const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = {
    uid: {
        type: String, 
        required: true
    },
    routes: {
        type: Array,
        required: false,
    },
    secrets: {
        type: Array,
        required: false
    }
}


module.exports = mongoose.model('User', User)