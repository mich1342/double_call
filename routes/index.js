const express = require('express');

const router = express.Router();

const db = require('../models');

const bcrypt = require('bcrypt');

const axios = require('axios');

const jwt = require('jsonwebtoken');

const { User } = require('../models');

const salt = 10;

const { logger } = require('../server/logger');

// Test Connection
router.get('/', (req, res, next) =>{
    logger.info('Request Test Connection', req);
    res.json({test:"test1111"});
    logger.info('Result Test Connection', res);
});

//Get All User in DB
router.get('/user/all', verifyToken, (req, res, next) =>{
    logger.info('Request Get All User', req);
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        } else{
            db.user.findAll().then(users => res.send(users));            
            logger.info('Result Get all User', res);
        }
    });
    
});

//Get Specific Url
router.get('/movies/:Title', (req,res,next) =>{
    logger.info('Request Get Specific URL', req);
    const movieTitle = req.params.Title;
    //console.log(movieTitle);
    //const newTitle = movieTitle.split(' ').join('+');
    const newTitle = movieTitle;
    //console.log(newTitle);
    axios.get("https://www.omdbapi.com/?t="+ newTitle +"&apikey=" + process.env.OMDB_AUTH)
        .then((response) => {
            console.log(response.data.Poster);
            res.send(response.data.Poster);
        })
        .catch(console.error);
    logger.info('Result Get Specific URL', res);
});

//Forbiden routes
router.get('/movies', (req,res,next) =>{
    logger.info('Request Forbidden Routes', req);
    console.log("https://www.omdbapi.com/?t="+ "AA" +"&apikey=" + process.env.OMDB_AUTH);
    res.sendStatus(403);
    logger.info('Result Forbidden Routes', res);
});

//Get all users favourite movies URL New
router.get('/movie/favorite', verifyToken, (req, res, next) =>{
    var AllMovies = '';
    logger.info('Request User Fav Movies URL', req);
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        } else{
            db.favourite_movie.findAll({where:{user_id: authData.user.id}}).then(favourite_movie => {
               
                var i = 0;
                let currentLink = [];
                while(i>-1){
                    try{
                        const currentTitle = favourite_movie[i].dataValues.title;
                        const currentTitleFormated = currentTitle; 
                        console.log(currentTitleFormated);
                        currentLink.push("https://www.omdbapi.com/?t=" + currentTitleFormated + "&apikey=" + process.env.OMDB_AUTH);
                                               
                    } catch(err){
                        break;
                    }
                    i++;                   
                }
                 
                console.log('final Data');
                console.log(currentLink);
                axios.all(currentLink.map(l => axios.get(l)))
                    .then(axios.spread(function(...out){
                        var j = 0;
                        //console.log(out);
                        while(j>-1){
                            try{
                                
                                const currentResult = String(out[j].data.Response);
                                if (currentResult === "False"){
                                    AllMovies+='Not Found,';
                                    
                                } else{
                                    AllMovies += String(out[j].data.Poster) + ', ';
                                }
                                
                            }
                            catch(err){
                                break;
                            }
                            j++;
                        }
                        const finalAllMovies = AllMovies.slice(0,-2);
                        res.json({
                            links:finalAllMovies
                        }) 
                        logger.info('Result all user favourite', res);
                    }));
                
            });
                
        }
    });  
    
});


router.get('/testTitle', (req,res,next) =>{
    axios.get("https://www.omdbapi.com/?t=How&apikey=" + process.env.OMDB_AUTH)
        .then((response) => {
            console.log(response.data.Poster);
            res.send(response.data.Poster);
        })
        .catch(console.error);

});


//User login to get Auth token with hash
router.post("/api/login", (req, res) =>{
    logger.info('Request Login', req);
    //console.log('Step1');
    const username = req.body.name;
    const password = req.body.password;
    //console.log(username);
    db.user.findOne({where:{name: username}}).then((users)=>{
        const db_password = users.password;
        //console.log(db_password);
        //console.log(password);
        bcrypt.compare(password, db_password)
        .then((response) =>{
            console.log(response);
            if(response === true){
                jwt.sign({user:users}, 'secretkey', (err, token)=>{
                    res.json({
                        token:token
                    });    
                });
                
            }else{
                res.sendStatus(403).send('Wrong Password');
            }
            logger.info('Result user login with hash', res);
        }).catch(logger.error);
    }); 
});


// Add favourite movies
router.post("/movies/favorite", verifyToken, async (req, res) =>{
    logger.info('Request Add User Favourite Movie', req);
    jwt.verify(req.token, 'secretkey', async (err, authData) =>{
        if(err){
            res.sendStatus(403);
        } else{
            const user_id = authData.user.id;
            console.log(user_id);
            db.favourite_movie.create({
                title: req.body.title,
                user_id: user_id
            }).then(submitedFilm => res.send(submitedFilm));
            logger.info('Result Add User Favourite Movie', res);
        }
    });

    
});


//Add new User
router.post("/user/new/noHash", (req, res) =>{
    logger.info('Request add a new user', req);
    db.user.create({
        name: req.body.name,
        password: req.body.password
    }).then(submiteduser => res.send(submiteduser));
    logger.info('Result add a new user', res);
});

//Add new User Hash
router.post("/user/new", (req, res) =>{
    logger.info('Request Add New User Hash', req);
    //console.log(req.body.password);
    bcrypt.hash(req.body.password, salt)
        .then((response) =>{
            console.log(response);
            db.user.create({
                name: req.body.name,
                password: response
            }).then(submiteduser => res.send(submiteduser));
            logger.info('Result Add new user hash', res);
        }).catch(logger.error);

   
    
});



function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];

        req.token = bearerToken;

        next();
    }else{
        res.sendStatus(403);
    }
};
module.exports = router;