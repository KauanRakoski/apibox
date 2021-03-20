const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

/* // Enabling cors
var corsOptions = {
  origin: ['https://8080-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io'],
  optionsSuccessStatus: 200
} */

app.use(cors())

// Body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connecting to MongoDB
const db = process.env.MONGO_URI

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
app.listen(process.env.PORT || 3030, () => console.log('\x1b[41m%s\x1b[0m','🚀  Application starting...'))
