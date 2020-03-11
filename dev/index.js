const express= require('express');
const exphbs = require('express-handlebars');
const blockchain_data=require('./blockchain_data');
const Blockchain=require('./Blockchain');
const bitcoin=require('./Blockchain');






//init express
var app= express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


//Homepage route
app.get('/',(req,res)=>{
	res.render('index',{blockchain_data});
});



// //Homepage route
// app.get('/a',(req,res)=>{	
// 	res.render('index',{blockchain_data});
// })

//blockchain_calc API Routes
app.use('/api/blockchain_calc',require('./routes/api/blockchain_calc'));




//listen on port
//
const PORT=process.env.PORT||5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));