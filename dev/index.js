const express= require('express');
const exphbs = require('express-handlebars');
//const blockchain_data=require('./blockchain_data');
const Blockchain=require('./Blockchain');
const bitcoin=require('./Blockchain');
const bodyparser=require('body-parser');
const mongoose= require('mongoose');
const mongo=require('mongodb');

//init express
var app= express();

//Database import
const blockchain_db= require('./blockchain_db');
console.log(blockchain_db.find());
const data= new blockchain_db();

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Test read
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://127.0.0.1', (err, client) => {
  if (err) return console.log(err)
  db = client.db('my_database') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('blockchain_dbs').find().toArray(function(err, results) {
  const t=results.length-1;
  var blockchain_data= results;
  module.exports= blockchain_data;
  res.render('index',{results1:results[t].pendingTransactions, results2:results[t].chain});

})
})

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// //Homepage route
// app.get('/',(req,res)=>{
// 	res.render('index',{blockchain_data});
// });

app.use('/api/blockchain_calc',require('./routes/api/blockchain_calc'));

//listen on port
//
const PORT=process.env.PORT||5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
