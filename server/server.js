const express = require('express');
const db = require('../models');

const apiRouter = require('../routes');
const bcrypt = require('bcrypt');

require('dotenv').config();
const app = express();


app.use(express.json());

let port = process.env.PORT;

app.use('/', apiRouter);
db.sequelize.sync().then(() =>{
    app.listen(port, () =>{
        console.log(`Server is listening to port ${process.env.PORT}`);
    });
});

