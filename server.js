const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image'); 
// destructuring - when want to have more fn from image.js file

//const PORT = process.env.PORT || 3003;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
      //host : '127.0.0.1', // 127.0.0.1 same as localhost , need to change while deploing to thers server
      //user : 'asif.e.iqbal',
      //password : '',
      //database : 'smart-brain',
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});


db.select ('*') .from ('users').then( data => {
    //console.log(data);
});

const app = express();
app.use(bodyParser.json()); //middlewire - to parse receved fronend data into json object
app.use(cors()); // another middlewire - security purpose

const database = {
    users: [
        { 
            id: 123,
            name: 'Asif',
            email: 'abd@gmx.de',
            password: 'test',
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: 'Lanny',
            email: 'lan@gmx.de',
            password: 'test2',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '',
            hash: '',
            email: ''
        }
    ]
}

app.get('/', (req, res) => { res.send('it is working')})
app.post('/signin', signin.handleSignin(db, bcrypt)) 
//use this advance JS or use following syntax
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)} )
app.put('/image', (req, res) => {image.handleImage(req, res, db)} )
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)} )
//Dependency injection - so that import fn has all the necessary dependecy

//defining server port - 
//to define dynamic port not hardcoded - use env variable process.env to have the port from the external server else 3000
app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}` ); 
}) 


//planning api or api design
/* 
   for root route --> res = this is working! 
   for signin route --> POST -- success/fail
   for register route --> POST -- user
   for profile/:userID route --> GET -- user
   for image --> PUT -- user
*/