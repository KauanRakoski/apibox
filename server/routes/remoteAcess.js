const router = require('express').Router()
const Tasks = require('../models/task')
const User = require('../models/user')
const qs = require('qs')
const {NodeVM} = require('vm2')

// User libraries
const axios = require('axios')

// Run a task
router.post('/:tid/:params', async (req, res) => {
    const {tid, params} = req.params || {}

    var task = await Tasks.findOne({
            _id: tid
    })
        
    var uid = task.author
        
    // Check if origin is in allowed routes
    // If it is not, end request
    const origin = req.get('origin')
    try {
        const user = await User.findOne({uid})
        
        const routes = user.routes
        var thisRoute = routes.find((route) => route == origin)

        if (thisRoute == undefined) {
            res.end()
            return
        }

        // If route is available, search for task using id
        // Extract the action from the task
        var action = task.action
        console.log(action)
        
        let response = await axios.post(`https://jsint-run-ut7jnye3qbqq.runkit.sh/${action}/${params}`, {})
        res.send({error: false, response: response.data})
        
    }catch(e){
        console.log(e)
    }
})


module.exports = router