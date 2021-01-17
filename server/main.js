const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
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
    res.send('🚀')
})

const taskManagement = require('./routes/taskManagement')
app.use('/', taskManagement)

app.listen(3030, () => console.log('🚀 RUN app'))
