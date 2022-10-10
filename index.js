const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/db');
const user = require('./model/signup');

const userRouter = require('./Routes/user');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(userRouter);



sequelize.sync()
    .then(()=>{
        app.listen(8000);
        console.log("app is running");
    })
    .catch(err => {
        console.log(err);
    })


