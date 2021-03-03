const router = require('express').Router()
const Tasks = require('../models/task')
const Routes = require('../models/apiRoutes')

router.post('/get-routes', async(req, res) =>{
    const {author} = req.body
    const userRoutes = await Routes.find({author: author}) 
    res.json(userRoutes)
})

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

router.post('/:author/:taskId', async(req, res)=>{
    const {author, taskId} = req.params
    
    const origin = req.get('origin')
    console.log(origin)
    const userRoutes = await Routes.find({author: author})  
    
    var thisRoute = userRoutes.find((allowed) => allowed.route == origin)
   
    if(thisRoute == undefined) res.end()
    
    var task = await Tasks.findOne({_id: taskId})
    var action = task.action
    
    var run = eval(action)
    run()
    res.end()
})
module.exports = router