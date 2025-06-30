const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000 // default port



//Midleware functions
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next(); // Mode on the next phase of the request
}

app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/' , function (req, res) {
  res.send('Welcome to my node js program World by jatin')
})




const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuItemRoutes');

app.use('/person',localAuthMiddleware, personRoutes);
app.use('/', menuRoutes);



app.listen(PORT,  () => {
  console.log('listening on port 3000');
})