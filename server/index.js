const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/chatApp')
const db = mongoose.connection
const routes = require('./routes/index')



db.on('error', (arr) => {
    console.log(arr);
})
db.once('open', ()=>{
    console.log('Database is connected');
})

const app = express();

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
    res.send('I am home page');
})

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})

