const router = require('express').Router()
const Tasks = require('../models/task')
const Routes = require('../models/apiRoutes')

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
    
    const userRoutes = await Routes.find({author})  

    var routes = userRoutes.find((router) => router.route == origin)
    console.log(routes)
    
    res.end()
})
module.exports = router