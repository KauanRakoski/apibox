const router = require('express').Router()
const Tasks = require('../models/task')
let exec = require('child_process').exec
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
        const inBrowser = false
        console.log(action)
        
        const vm = new NodeVM({
            console: 'off',
            wrapper: 'none',
            context: 'sandbox',
            sandbox: {inBrowser, params},
            require: {
                external: true,
                internal: false
            }
        })

        let r = vm.run(action, 'vm.js')
        res.send({error: false, response: r})
        
    }catch(e){
        console.log(e)
    }
})

router.post('/install', (req, res) => {
    console.log('jfdsfb')
    const {module} = req.body
    exec(`npm i ${module}`)
})

/**
 *  
*/
router.post('/sandbox', (req,res) => {
    const {code} = req.body
    console.log(code)
    const inBrowser = false
    
    try{
        const vm = new NodeVM({
            console: 'off',
            wrapper: 'none',
            context: 'sandbox',
            sandbox: {inBrowser},
            require: {
                external: true,
                internal: false
            }
        })

        let r = vm.run(code, 'vm.js')
        res.send({error: false, response: r, details: "Successful request"})
    }catch(e){
        console.log(e)
         res.send({error: true, response: null, details: e})
    }
})

router.post('/actions', async(req,res) => {
    const {id, data} = req.body
    console.log(id, data)
    try{
        var task = await Tasks.findOneAndUpdate({_id: id}, {action: data})
        res.end()
    }
    catch(e){
        res.send({error: true, details: e})
    }
})


module.exports = router