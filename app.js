const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();




const { getHomePage } = require('./routes/index');
const { addRecipe, deleteRecipe, editRecipe, editRecipePage, addRecipePage } = require('./routes/recipe');
const {  searchRecipePage } = require('./routes/search');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: "Maya1234",
    database: "mydb"
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload


app.get('/', getHomePage);
app.get('/add', addRecipePage);
app.get('/edit/:id', editRecipePage);
app.get('/delete/:id', deleteRecipe);
app.post('/add', addRecipe);
app.post('/edit/:id',editRecipe);
/*app.get('/search',searchRecipePage);*/
/*app.post('/search:id_product',getsearchRecipe); */

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});