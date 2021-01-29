const express = require('express')
const mongoose = require('mongoose')
const Tasks = require('../models/task')

const router = express.Router()

router.post('/add/:uid/', async (req, res) => {
    var uid = req.params.uid
    var {
        name,
        description,
        key,
        code
    } = req.query
    console.table({
        name,
        description,
        key,
        code
    })
    try {
        await Tasks.create({
            author: uid,
            name: name,
            description: description,
            key: key,
            action: code
        })

        res.end()
    } catch (e) {
        console.log(e)
    }
})

router.post('/getdata/:uid', async (req, res) => {
    let author = req.params.uid

    try {
        let tasks = await Tasks.find({
            author: author
        })
        res.send(tasks)
    } catch (e) {
        console.log(e)
    }
})

router.post('/delete/:taskId', async (req, res) => {
    let taskId = req.params.taskId

    try {
        await Tasks.deleteOne({
            _id: taskId
        })
        res.end()
        console.log('💔 Deleted')
    } catch (e) {
        console.log('Oh oh...')
        console.table(e)
    }
})

module.exports = router