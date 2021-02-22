const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Routes = {
    author: {
        type: String, 
        required: true
    },
    route: {
        type: String,
        required: true
    }
}


module.exports = mongoose.model('Routes', Routes)
