const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000




mongoose.connect('mongodb+srv://admin:somepassword@cluster0.ej23h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION FAILED")
        console.log(err)
    })

//render if we want.


//Routes to have to get stock info. 
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//Routes to have to get stock info. 
app.get('/getuser', (req, res) => {
  res.json({ user: 'tommy' })
})
//setup client-side



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
