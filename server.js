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
/* const url = 'mongodb://mongodbjf:27019';  */

//probado tambien con este y no me conecta
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


// // Connect to mongodb server
//const MongoClient = require('mongodb').MongoClient;

//  Your url connection to mongodb container 
//Para usar un puerto que no se haya usado con la versión local de mongodb
//const url = 'localhost:27019';   



app.get('/all', async function (req, res) {
    try{ 
        const client = await MongoClient.connect(url , { useNewUrlParser:true, useUnifiedTopology: true});
        const dbo = client.db(dbName);
        const query = {};
        const result = await dbo.collectionName(collectionName).find(query).toArray();
        if(result.length > 0){
            res.status(200).send(result);
            console.log('BBDD tiene datos');
        }else{
            res.status(200).send("No hay datos");
            console.log('Nohay datos en BBDD');
        }
        client.close();
    }
     catch (err){
        console.error(err);
        res.status(500).send("No conectó");

    } 
    // conexión correcta probada 
   /*  MongoClient.connect(url, function(err,db){
            console.log("conectado");
            
    }); */
    
});




app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}`);