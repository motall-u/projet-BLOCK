const sha256=require('js-sha256');

 //Constructor function
 function Blockchain(){
 	this.chain=[]; //Store the chain all block
 	this.pendingTransactions=[];// Record all transactions:transactions en cours

 	//Creating the genesis block: The First
 	this.createNewBlock(100,'0','0'); //Default values
 } 

//Creating blockchain method for new block

Blockchain.prototype.createNewBlock= function(nonce,previousBlockHash, hash){
	 const newBlock={
	 	index:this.chain.length +1,
	 	timestamp:Date.now(),
	 	transactions:this.pendingTransactions, //Only pendingTransactions for block
	 	nonce: nonce,
	 	hash:hash,
	 	previousBlockHash: previousBlockHash 

	 };

	 this.pendingTransactions=[];
	 this.chain.push(newBlock);

	 return newBlock;
}

//Get last block function
Blockchain.prototype.getLastBlock= function(){
	return this.chain[this.chain.length-1];
}

//Create new transaction
//amout means 'montant'
Blockchain.prototype.createNewTransaction= function(amount,sender,recipient){
	const newTransaction={
		amount:amount,
		sender:sender,
		recipient:recipient
	};
	//We record this transaction into pendingTransactions(all transactions)
	this.pendingTransactions.push(newTransaction);
	return this.getLastBlock()['index']+1;
}


///sha256 method
Blockchain.prototype.hashBlock=function(previousBlockHash,currentBlockData, nonce){
	//Transform input to string
	const dataAsString= previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	//Calculate the hash value
	const hash=sha256(dataAsString);
	return hash;

}

//ProofOfWork method
Blockchain.prototype.proofOfWork=function(previousBlockHash,currentBlockData){
	let nonce =0;
	let hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
	while(hash.substring(0,4)!='0000'){
		nonce++;
		hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
		//console.log(hash);
	}
	return nonce;
}







module.exports = Blockchain;