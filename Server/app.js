const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config()


mongoose.connect('mongodb://localhost/sistema', { useNewUrlParser: true , useUnifiedTopology: true}, 
    () => {console.log('Conectado')});

const app = express();

// View engine
app.set('view engine', 'ejs');

// Routes
const disp = require('./routes/dispositivo');
const user = require('./routes/user');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

// Static file
app.use(express.static('public'));

// Routes
app.use('/user', user);
app.use('/disp', disp);

// Views
app.get('/user/login', (req, res) => {
    res.render('login');
})

app.get('/user/home/', (req, res) => {
    res.render('home');
})

//404
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Errors
app.use((err, req, res, next) => {
    const error = app.get('env') == 'development' ? err : {};
    const status = err.status || 500;

    // Response
    res.status(status).json({
        error: {
            message : error.message
        }
    });
})

// Start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
