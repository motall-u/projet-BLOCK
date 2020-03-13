const mongoose= require('mongoose');
//define Schema
var Schema= mongoose.Schema;

var schema= new Schema({
	chain:
	[{}],
	pendingTransactions:[{ amount: Number, sender: String, recipient: String}]
});
mongoose.model('Blockchain_db',schema);
module.exports= mongoose.model('Blockchain_db',schema);

