const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tasks = {
    author: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    }
}


module.exports = TasksModel = mongoose.model('Tasks', Tasks);