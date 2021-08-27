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

app.use(express.urlencoded({ extended: true }));

//render if we want.


//Routes to have to get stock info. 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Routes to have to get stock info. 
app.get('/user', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.json({ user: 'tommy' })
})

app.post('/user', async (req, res) => {
  const newUser = new User(req.body);
  console.log(newUser)
  await newUser.save();
})

//setup client-side



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
