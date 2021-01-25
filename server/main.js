const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')



var corsOptions = {
  origin: ['https://8080-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const db = process.env.MONGO_URI

app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

const taskManagement = require('./routes/taskManagement')
app.use('/', taskManagement)

app.listen(3030, () => console.log('🚀 RUN app'))
