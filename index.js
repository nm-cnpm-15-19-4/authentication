const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')


// crypto = require("crypto"); // md5
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const accountRouter = require('./routers/account.routers');

require("dotenv").config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser())

//app.use("/", searchsRouter);
app.use("/", accountRouter);
//
//
//start listening to server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
