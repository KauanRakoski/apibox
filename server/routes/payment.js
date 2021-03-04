const router = require('express').Router()
const Stripe = require('stripe');
const Tasks = require('../models/task')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY)

router.post('/list', async (req, res) => {
    var userList = await stripe.customers.list()
    var users = userList.data

    res.send(users)
})


router.post('/create-costumer/:email', async (req, res) => {
    const costumer = await stripe.customers.create({
        email: req.params.email
    })
    console.table(costumer)
    console.log(costumer)
})

router.post('/sub', async (req, res) => {
    const {
        email,
        payment_method
    } = req.body;

    const customer = await stripe.customers.create({
        payment_method: payment_method,
        email: email,
        invoice_settings: {
            default_payment_method: payment_method,
        },
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
            price: 'price_1Hv3bjJ1YBMak5vm5IxbuVZU'
        }],

    });

    const status = subscription['status']
    /* const client_secret = subscription['latest_invoice']['payment_intent']['client_secret'] */

    res.json({
        'client_secret': '',
        'status': status
    });
})

router.post('/cancel/', async(req, res) => {
  const {cid, uid} = req.body
  
  try{  
    await stripe.customers.del(cid)
    await Tasks.deleteMany({author: uid})
    res.end()
  }
  catch(e){
    console.log(e)
  }
})
module.exports = router