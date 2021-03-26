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
        initial: []
    },
    secrets: {
        type: Array,
        required: false,
        initial: []
    }
}


module.exports = mongoose.model('User', User)