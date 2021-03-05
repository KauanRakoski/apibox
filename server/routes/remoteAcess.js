const router = require('express').Router()
const Tasks = require('../models/task')
const Routes = require('../models/apiRoutes')
const {NodeVM} = require('vm2')

// User libraries
const axios = require('axios')

// Get user routes by author id
router.post('/get-routes', async(req, res) =>{
    const {author} = req.body
    const userRoutes = await Routes.find({author: author}) 
    res.json(userRoutes)
})

// Register a router, with author id
router.post('/register-route', async(req, res) => {
    const {author, route} = req.body
    
    try{
        const created = await Routes.find({author})
        const thisRoute = created.find((r) => r.route == route)
        
        if(thisRoute == undefined) await Routes.create({author, route})
        res.end()
    }
    catch(e){
        console.log(e)
        res.send({error: true})
    }
})

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
    const vm = new NodeVM({
        console: 'off',
        sandbox: {res, axios},
        require: {
            external: true
        }
    })

    vm.run(`${action}`)
    res.end()
})

router.post('/delete-route', async(req, res)=>{
    const {id} = req.body

    try{
        await Routes.deleteOne({_id: id})
        res.end()
    }
    catch(e){
        res.send({error:true, message: e.message})
    }
})
module.exports = router