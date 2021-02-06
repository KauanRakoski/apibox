const router = require('express').Router()
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51HuKA0J1YBMak5vmpWELpI6iBDXLwqhecr3UX3mvyP56thOpKf88592MM24SV5bcxsanQCXtjRW4nxgh3EScgpTX00VYVxFvBq')

router.post('/list', async (req, res) => {
    var userList = await stripe.customers.list()
    var users = userList.data

    res.send(users)
})
/* router.post(
  '/stripe-webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {  
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    const dataObject = event.data.object;

    switch (event.type) {
      case 'invoice.paid':
        break;
      case 'invoice.payment_failed':
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
        } else {
        }
        break;
      default:
      // Unexpected event type
    }
    res.sendStatus(200);
  }
) */

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

module.exports = router