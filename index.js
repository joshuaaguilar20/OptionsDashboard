const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const app = express()
const port = 3000

const User = require('./models/user');

mongoose.connect('mongodb+srv://admin:somepassword@cluster0.ej23h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION FAILED")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE, POST, PUT");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//render if we want.


//Routes to have to get stock info. 
app.get('/', (req, res) => {
  res.send('Hello World!')
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
