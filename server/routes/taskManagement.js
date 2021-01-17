const express = require('express')
const mongoose = require('mongoose')
const Tasks = require('../models/task')

const router = express.Router()

router.post('/add/:uid/', async (req, res) => {
    var uid = req.params.uid
    var {name, description, key, code} = req.body
    console.log(name, description, key, code)
    console.log(uid)
    try{
        await Tasks.create({
            author: uid,
            name: name,
            description: description,
            key: key, 
            action: code
        })
        console.log("ok")
    }
    catch(e){
        console.log(e)
    }
})

router.post('get/:email', async(req,res) => {
    let author = req.params.email
    try{
        let tasks = await Tasks.find({author: author})
        res.json(tasks)
    }catch(e){
        console.log(e)
    }
})

module.exports = router