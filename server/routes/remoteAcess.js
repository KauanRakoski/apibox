const router = require('express').Router()
const Tasks = require('../models/task')
const User = require('../models/user')
const {NodeVM} = require('vm2')

// User libraries
const axios = require('axios')

// Run a task
router.post('/:uid/:tid', async(req, res)=>{
    const {uid, tid} = req.params
    console.log(uid, tid)
    // Check if origin is in allowed routes
    // If it is not, end request
    const origin = req.get('origin')
    const user = await User.findOne({uid})  
    const routes = user.routes
    var thisRoute = routes.find((route) => route == origin)
   
    if(thisRoute == undefined) res.end()
    
    // If route is available, search for task using id
    // Extract the action from the task
    var task = await Tasks.findOne({_id: tid})
    var action = task.action
    
    // Create a vm instance to run the code in a safer way
    // Also, pass some variables and libraries
    const inBrowser = false
    const vm = new NodeVM({
        console: 'inherit',
        sandbox: {res, axios, inBrowser},
        require: {
            external: true
        }
    })

    vm.run(`${action}`)
    res.end()
})


module.exports = router