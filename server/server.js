const express = require('express');
const db = require('../models');

const apiRouter = require('../routes');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());


app.use('/', apiRouter);
db.sequelize.sync().then(() =>{
    app.listen(process.env.PORT || '3000', () =>{
        console.log("Server is running on port: ${process.env.PORT || '3000'}");
    });
});

