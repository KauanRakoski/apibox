const router = require('express').Router()
const Tasks = require('../models/task')
const Routes = require('../models/apiRoutes')
const {NodeVM} = require('vm2')

// User libraries
const axios = require('axios')

// Run a task
router.post('/:author/:taskId', async(req, res)=>{
    const {author, taskId} = req.params
    
    // Check if origin is in allowed routes
    // If it is not, end request
    const origin = req.get('origin')
    const userRoutes = await Routes.find({author: author})  
    var thisRoute = userRoutes.find((allowed) => allowed.route == origin)
   
    if(thisRoute == undefined) res.end()
    
    // If route is available, search for task using id
    // Extract the action from the task
    var task = await Tasks.findOne({_id: taskId})
    var action = task.action
    
    // Create a vm instance to run the code in a safer way
    // Also, pass some variables and libraries
    const inBrowser = false
    const vm = new NodeVM({
        console: 'off',
        sandbox: {res, axios, inBrowser},
        require: {
            external: false
        }
    })

    vm.run(`${action}`)
    res.end()
})


module.exports = router