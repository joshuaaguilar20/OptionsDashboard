const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan')
const passport = require('passport')
const fs = require('fs')
require('dotenv').config()

const app = express()
const port = 3000

const dbUser = process.env.MONGO_USER
const dbPass = process.env.MONGO_PASSWORD

const User = require('./models/user');
/* Setup DB */
const dbURL = `mongodb+srv://${dbUser}:${dbPass}@cluster0.ej23h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(dbURL, mongoOptions)
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION FAILED")
        console.log(err)
    })

/* middleware */
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined', { stream: accessLogStream }))

/* Middleware function to set headers prior to all request.  */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE, POST, PUT");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/*
TODO:
Fix the login vs signup logic backend and frontend
create a seperate route for signup and login, or combine the 2 with put request?
create seperate signup page that you can access from the login page?
*/

app.get('/stock/add/:id/:symbol', async (req, res) => {
  try{
    const { id, symbol } = req.params;
    //GET API KEY -from stock site. 
    //stock API to fetch stock price for that symbol -> 
    //make request to the site with Data return to user/ 
    const user = await User.findByIdAndUpdate(id, {$addToSet: {stock: [symbol]}}, { new: true });
    res.json(user)
  }
  catch(e){
    console.log("Could not append stock symbol")
    console.log(e)
  }
})

//Routes to have to get stock info. 
app.get('/user/all', async (req, res) => {
  try{
    const allUsers = await User.find({});
    console.log("test")
    console.log(allUsers)
    res.json(allUsers)
  }
  catch(e){
    console.log("Error getting users")
    console.log(e)
  }
})


app.get('/user/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const user = await User.findById(id)
    res.json(user)
  }
  catch(e){
    console.log("Error getting user by id")
    console.log(e)
  }
})

app.post('/user/login', async (req, res) => {
  try {
    console.log(req.body)
    const searchUser = await User.find(req.body)
    console.log(searchUser)
    if(searchUser.length !== 0) {
      res.json(searchUser[0])
    }
    else {
      console.log("User does not exist")
      res.json("User does not exist")
    }
  }
  catch (e) {
    console.log("Error logging in")
    console.log(e)
  }
})

app.post('/user/signup', async (req, res) => {
  try{
    const searchUser = await User.find(req.body) 
    if(searchUser.length !== 0) {
      console.log("User already exists")
      console.log(searchUser[0])
      res.json("User already exists")
    }
    else {
      const newUser = new User(req.body);
      await newUser.save();
      res.json(newUser)
    }
  }
  catch(e){
    console.log("Error signing up")
    console.log(e)
  }
})

app.post('/user', async (req, res) => {
  try{
    const searchUser = await User.find(req.body) 
    if(searchUser.length !== 0) {
      console.log("User already exists")
      console.log(searchUser)
    }
    else {
      const newUser = new User(req.body);
      await newUser.save();
      res.json({ id: `${newUser._id}`})
    }
  }
  catch(e){
    console.log("Error making new user")
    console.log(e)
  }
})

app.delete('/user/deleteall', async (req, res) => {
  try{
    const deletedProduct = await User.deleteMany({});
    console.log("deleted all")
  }
  catch(e){
    console.log(e)
  }
})
 
//setup client-side


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
