const {text_completion} = require('./Models/Text-completion/main')
const {image_generation} = require('./Models/image-generation/main')
const {jwtmiddleware} = require("./middleware")
const {LoginParams,SignUpParams} = require('./db');

const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 

app.get('/login', async(req,res) => {
    // need : username , password
    // return : jsonwebtoken
    // verify with database , if user exit then send jwt

    const username = req.body.urm;
    const password = req.body.password;    
    const token = await LoginParams(username,password)
    res.send({token})
})

app.get('/admin', async(req,res) => {
    //admin route//
    //recieves ==> admin_username , admin_password , admin_mail 

})

app.post('/signup', async(req,res) => {
    // need : username , password
    // return : account creation accepted or rejected.
    // check if user exists , if not then create new user. and redirect to login endpoint

    const username = req.body.urm;
    const password = req.body.password;   
    const email = req.body.email;
    const result = await SignUpParams(username,password,email)
    res.send({result})
})

app.get('/api/txt',async(req,res) => {
    // need : Prompt , number of lines , user JWT
    // return : Request failed/passed , response text
    // verify JWT , check if user have enough credits , if not then reject , send api request to sarvam/gemini
    if(await jwtmiddleware(req)){
        text_completion(req,res)
    }else{
        res.send("INVALID TOKEN | PLEASE LOGIN AGAIN !!!")
    }

})

app.get('/api/img', async(req,res) => {
    // need : Prompt , style , user JWT , Model
    // return : Request failed/passed , response image
    // verify JWT , check if user have enough credits , if not then reject , send api request to sarvam/gemini
    if(await jwtmiddleware(req)){
        image_generation(req,res)
    }else{
        res.send("INVALID TOKEN | PLEASE LOGIN AGAIN !!!")
    }
})

app.listen(port, () => {
    console.log("server running on 3000")
})