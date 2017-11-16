

const express = require('express');
const path  = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();
const port = process.env.PORT ||3000;
app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

const config = require('./config/database');
const user = require('./routes/users');
const location = require('./routes/locations');

const connection =mongoose.connect(  config.database, { useMongoClient: true });
if (connection){
    console.log("database connected");
}else {
    console.log("database not  connected");
}


app.use(express.static(path.join(__dirname,"public")));
app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set("view options", {layout: false});

//seed db.
const seed = require('./seed/dummyParks');
seed();

app.use('/user',user);
app.use('/locations', location);

app.get("/",function (req,res){
    res.render('index.html')
});



app.listen(port,function () {
    console.log("listening to port "+ port);
});