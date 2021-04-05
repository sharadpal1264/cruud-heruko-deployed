require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const upload = require('express-fileupload');
const employeeController = require('./controllers/employeeController');
let port =process.env.PORT || 8080;

var app = express();

//Middleware
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(upload());

//middleware used to require the local uploads folder path and use this in list page
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(port, () => {
    console.log(`Express server started at port : ${port}`);
});

app.use('/', employeeController);