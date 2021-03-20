const {encrypt} = require('../helpers/crypto')
const User = require('../models/user')
const router = require('express').Router()

router.post('/create', async(req, res) => {
    const {uid} = req.body

    try{
        User.create({uid})
    }catch(e){
        res.send({error: true})
    }
})
router.post('/secret', async(req, res) => {
    const {name, key, uid} = req.body

    try{
        secret = {name: name, key: encrypt(key)}
        user = User.find({uid})
        user.secrets.push(secret)
        user.save()

        res.end()
    }catch(e){
        res.json({error: true})
    }
})

router.post('/routes', async(req, res) =>{
    const {author} = req.body
    const userRoutes = await Routes.find({author: author}) 
    res.json(userRoutes)
})

// Register a router, with author id
router.post('/route', async(req, res) => {
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

router.post('/del-route', async(req, res)=>{
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