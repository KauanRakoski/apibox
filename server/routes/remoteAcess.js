const router = require('express').Router()
const Tasks = require('../models/task')
const User = require('../models/user')
const qs = require('qs')
const {NodeVM} = require('vm2')

// User libraries
const axios = require('axios')

// Run a task
router.post('/:tid/:params', async (req, res) => {
    const {tid, params} = req.params

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
        
        
        // Create a vm instance to run the code in a safer way
        // Also, pass some variables and libraries
        let response = await axios.post(`https://jsint-run-ut7jnye3qbqq.runkit.sh/${action}/${params ? params : {}}`,
            qs.stringify("{action: 'action', params: 'params'}")
        )
        res.send({error: false, response: response.data})
        /* const inBrowser = false

        const vm = new NodeVM({
            console: 'inherit',
            wrapper: 'none',
            sandbox: {
                axios,
                inBrowser
            },
        })

        const r = vm.run(`${action}`)
        console.log(r)
        res.json(r) */
    }catch(e){
        // res.send({error: true})
        console.log(e)
    }
})


module.exports = router