// module imports
const express = require('express');
const path = require('path');
let mongoose = require('mongoose');
let passport = require('passport');
const bodyParser = require("body-parser");
const cors = require('cors')

mongoose.connect('mongodb://admin1:admin123@ds227332.mlab.com:27332/prayer-app'), {
  useNewUrlParser: true
};

// express config
const app = express();
app.use(bodyParser.json())
app.use(passport.initialize());


// !!! DEVELOPMENT ONLY (start) !!! //
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
// !!! DEVELOPMENT ONLY (end) !!! //

require('./models/prayer');
require('./models/user');
const prayers = require('./routes/prayers');
const users = require('./routes/users');
app.use('/prayers', prayers);
app.use('/users', users);


var distDir = __dirname + "/dist/group-project/";
app.use(express.static(distDir));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/group-project/index.html"))
})

// server config
app.listen(process.env.PORT || 8080);
