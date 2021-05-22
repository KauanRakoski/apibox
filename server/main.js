const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const helmet = require('helmet')



/* app.use('/api', cors()) */
app.use(helmet())
app.use(cors())



// Body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connecting to MongoDB
const db = process.env.JSINT_DB

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, 
    useCreateIndex: true,
})
.then(() => console.log('✔️  Database connection established'))
.catch((e) => console.log('❌ Database connection failed'));

app.get('/', (req, res) => {
    res.send('🚀 Running')
})

//Adding routes
const taskManagement = require('./routes/taskManagement')
app.use('/', taskManagement)

const Payment = require('./routes/payment')
app.use('/payment', Payment)

const Api = require('./routes/remoteAcess')
app.use('/api', Api)

const User = require('./routes/user-data')
app.use('/user', User)

// Listening
app.listen(process.env.PORT || 3030, () => console.log('🚀  Application starting...'))
