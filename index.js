const mongoose = require('mongoose')
const express = require('express')
const app = express()

//const db = "mongodb+srv://nikunj05108:t4xfUibb9iQQ1ZRF@cluster0.kcuccpd.mongodb.net/?retryWrites=true&w=majority";
const db = "mongodb+srv://root:root@cluster0.1rzoyg7.mongodb.net/?retryWrites=true&w=majority"
//mongodb+srv://root:<password>@cluster0.1rzoyg7.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(db).then(() => {
    console.log('CONNECTION SUCCESSFUL');
}).catch((err) => {
    console.log(err);
})

app.use(express.json())
app.use(require('./router/auth'))


// app.get('/', (req, res) => {
//     res.send(`Hello world from server`)
// })

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })