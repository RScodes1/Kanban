
const express = require('express');
const path = require('path');

require('dotenv').config()

const app = express()

const { connection } = require('./config/db')
const {router} = require('./routes/user.routes');
const {Brouter } = require('./routes/board.routes');

app.use(express.json())
app.use('/users', router);
app.use(Brouter);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
})

app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("connected to mongodb");
        console.log(`successfully connected to http://localhost:${process.env.PORT}`);
    } catch (error) {
        console.log("error", error);
    }
})