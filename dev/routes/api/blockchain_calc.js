const express =require('express');
const router= express.Router();
const blockchain_data=require('../../blockchain_data');
const Blockchain=require('../../Blockchain');

//Creation of new Blockchain
const bitcoin = new Blockchain();//premier block deja initialiser




//Get all data
router.get('/',(req,res)=>{
	res.json(blockchain_data);
});




//Create transaction
router.post('/',(req,res)=>{
	const newTransactions={
		amount: req.body.amount,
		sender:req.body.sender,
		recipient:req.body.recipient
	}	

		
	if (newTransactions.amount !=='' && newTransactions.sender !== '' && newTransactions.recipient !== '') {
		
		bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
		blockchain_data.pendingTransactions.push(newTransactions);


	}else{
		return res.status(400).json({msg:'Transaction impossible'});
	}
	// res.json(members);
	res.redirect('/'); 

});

//Create new block
router.post('/a',(req,res)=>{

});


//blockchain_data.push(Blockchain);

console.log(bitcoin);


module.exports=bitcoin;
module.exports=router;
