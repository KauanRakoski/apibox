const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

// Enabling cors
var corsOptions = {
  origin: ['https://8080-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

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
.then(() => console.log('Database connection established'))
.catch((e) => console.log('Database connection denied'));

app.get('/', (req, res) => {
    res.send('🚀 Running')
})

//Adding routes
const taskManagement = require('./routes/taskManagement')
app.use('/', taskManagement)

const Payment = require('./routes/payment')
app.use('/payment', Payment)

app.listen(3030, () => console.log('🚀 RUN app'))
