const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/login', (req,res) => {
    // need : username , password
    // return : jsonwebtoken
    // verify with database , if user exit then send jwt

    const username = req.username;
    const password = req.query.password;
    console.log(req);

    res.send('Hello from login endpoint!')
})

app.get('/signup', (req,res) => {
    // need : username , password
    // return : account creation accepted or rejected.
    // check if user exists , if not then create new user. and redirect to login endpoint
    res.send('Hello from signup endpoint!')
})

app.get('/api/txt', (req,res) => {
    // need : Prompt , number of lines , user JWT
    // return : Request failed/passed , response text
    // verify JWT , check if user have enough credits , if not then reject , send api request to sarvam/gemini
    res.send('Hello from text gen endpoint!')
})

app.get('/api/img', (req,res) => {
    // need : Prompt , style , user JWT
    // return : Request failed/passed , response image
    // verify JWT , check if user have enough credits , if not then reject , send api request to sarvam/gemini
    res.send('Hello from signup endpoint!')
})

app.listen(port, () => {
    console.log("server running on 3000")
})