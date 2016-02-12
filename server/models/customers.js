var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
	name: {type: String},
	data: {type: Array}
});

mongoose.model('Customer', CustomerSchema);