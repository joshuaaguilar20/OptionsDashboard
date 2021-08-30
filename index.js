const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Middleware function to set headers prior to all request.  */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE, POST, PUT");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/* Assiocate with user: Josh: IBM, Apple
   Notes: @TODO -> Logging
   FRONT END Fetch stock price -> add then saves to db.
*/
app.get('/stock/add/:id/:symbol', (req, res) => {
   //stock/pfe
   const { symbol } = req.params;
   console.log(symbol)
   //GET API KEY -from stock site. 
   //stock API to fetch stock price for that symbol -> 
   //make request to the site with Data return to user/ 
  res.send('Hel')
})

//Routes to have to get stock info. 
app.get('/user/all', async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers)
})

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
  res.json(user)
})

app.post('/user', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ id: `${newUser._id}`})
})

app.delete('/user/deleteall', async (req, res) => {
  const deletedProduct = await User.deleteMany({});
  console.log("deleted all")
})
 
//setup client-side


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
