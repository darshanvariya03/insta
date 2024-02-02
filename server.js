const express = require('express');

const app = express();

const port = 8000;

const path = require('path');

app.set('view engine','ejs');

const db = require('./config/db');

const passport = require('passport');
const passportLocal = require('./config/passportlocalStratagy');
const session = require('express-session');


app.use(session({
    name : 'drs',
    secret : 'drs1234',
    saveUninitialized  :true,
    resave : true,
    cookie : {maxAge : 1000 * 60 * 60 * 24}
}))

app.use('/public',express.static(path.join(__dirname,'public')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser) 

app.use('/',require('./routes/indexroutes'));
app.use('/',require('./routes/instaroutes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :${port}`);
})  

