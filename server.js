const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const PORT = process.env.PORT || 3000 // default port

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body


app.get('/', function (req, res) {
  res.send('Welcome to my node js program World')
})




const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuItemRoutes');
app.use('/', menuRoutes);



app.listen(PORT,  () => {
  console.log('listening on port 3000');
})