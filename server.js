const express = require('express');
// Constants
const hostname = '0.0.0.0';
const port = 8080;

// App
const app = express();

const bodyParser = require('body-parser');
const { promisify } = require('util');

//BBDD
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27019';
const dbName = 'users';
const collectionName = 'datos';


app.use(bodyParser.json()); // for parsing application/json



// GET method route
app.get('/', function (req, res) {
    res.send('Estas en el método get_OK');
});
  
// POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage_ok');
});

// GET method route
app.get('/secret', function (req, res, next) {
    res.send('Never be cruel, never be cowardly. And never eat pears!');
    console.log('This is a console.log message.');
});

/*
Your implementation here 
*/

// // Connect to mongodb server
//const MongoClient = require('mongodb').MongoClient;
// /* Your url connection to mongodb container */
//const url = 'localhost:27019';

app.get('/all', async function (req, res) {
    try{ 
        const client = await MongoClient.connect(url);
        const dbo = client.db(dbName);
        const query = {};
        const result = await dbo.collectionName(collectionName).find(query).toArray();
        if(result.length > 0){
            res.status(200).send(result);
            console.log('Si es mayor que 0');
        }else{
            res.status(200).send("No hay datos");
            console.log('no es mayor que cero');
        }
    }
     catch{
        console.log('saltó a catch');
        res.status(200).send("No conectó");

    } 
    
});


// GET method route
// Retrieve all documents in collection


// GET method route
// Query by a certain field(s)
// ...

/* PUT method. Modifying the message based on certain field(s). 
If not found, create a new document in the database. (201 Created)
If found, message, date and offset is modified (200 OK) */
// ...

/* DELETE method. Modifying the message based on certain field(s).
If not found, do nothing. (204 No Content)
If found, document deleted (200 OK) */
// ...


app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);