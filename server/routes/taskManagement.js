const express = require('express')
const Tasks = require('../models/task')

const router = express.Router()

router.post('/add/:uid/', async (req, res) => {
    var uid = req.params.uid
    var {name, description, key, action} = req.body
    console.log(name,
        description,
        key,
        action, uid)
    
    try {
        await Tasks.create({
            author: uid,
            name: name,
            description: description,
            key: key,
            action: action
        })
        console.log("ok")
        res.end()
    } catch (e) {
        res.send({error: true})
    }
})

router.post('/edit/:taskId', async(req, res) => {
    let id = req.params.taskId
    let {name, description, key, code} = req.body
    try{
        await Tasks.findOneAndUpdate({_id: id}, {
            name,
            description,
            key,
            action: code
        }
        )

        res.end()
    }
    catch(e){
        res.send({error: true})
    }
})

router.post('/getdata/:uid', async (req, res) => {
    let author = req.params.uid

    try {
        let tasks = await Tasks.find({
            author: author
        })
        console.log(tasks)
        res.send(tasks)
    } catch (e) {
        res.send({error: true})
    }
})

router.post('/delete/:taskId', async (req, res) => {
    let taskId = req.params.taskId

    try {
        await Tasks.deleteOne({
            _id: taskId
        })
        res.end()
        
    } catch (e) {
        res.send({error: true})
    }
})

router.post('/qr', async(req, res) => {
    const {task_id, user} = req.body
    console.log(task_id, user)
    console.log('---------------------------------------------------------')

    try{
        let task = await Tasks.findOne({_id: task_id})
        let {name, description, key, action} = task
        console.log(name, description, key, action)
        await Tasks.create({
            author: user,
            name: name,
            description: description,
            key: key,
            action: action
        })
    }catch(e){
        console.log(e)
    }finally{
        res.end()
    }
})

module.exports = router