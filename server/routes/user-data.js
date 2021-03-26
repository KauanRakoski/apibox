const {encrypt} = require('../helpers/crypto')
const User = require('../models/user')
const router = require('express').Router()

router.post('/create', async(req, res) => {
    const {uid} = req.body

    try{
        let user = await User.findOne({uid})

        if(!user){
            User.create({uid})
            res.end()
        }
        else{
            res.end()
        }
    }catch(e){
        res.send({error: true})
    }
})
router.post('/secret', async(req, res) => {
    const {name, key, uid} = req.body

    try{
        secret = {name: name, key: encrypt(key)}
        user = await User.find({uid})
        user.secrets.push(secret)
        user.save()

        res.end()
    }catch(e){
        res.json({error: true})
    }
})

router.post('/routes', async(req, res) =>{
    try{
        const {uid} = req.body
        const user = await User.findOne({uid}) 
        res.json(user.routes)
    }catch(e){
        res.json({error: true})
    }
    
})

// Register a router, with author id
router.post('/route', async(req, res) => {
    const {uid, route} = req.body
    
    try{
        var user = await User.findOne({uid: uid})
        const thisRoute = user.routes.find((r) => r == route)
        
        if(thisRoute == undefined){
            user.routes.push(route)
            await user.save()
        } 
        
        res.end()
    }
    catch(e){
        console.log(e)
        res.send({error: true})
    }
})

router.post('/del-route', async(req, res)=>{
    const {uid, index} = req.body

    try{
       let user = await User.findOne({uid: uid})
       user.routes.splice(index, 1)

        await user.save()
        res.end()
    }
    catch(e){
        console.log(e)
        res.send({error:true, message: e.message})
    }
})

module.exports = router