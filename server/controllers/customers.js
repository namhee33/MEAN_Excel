var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var xlsx = require('node-xlsx');


module.exports = (function(){
	return{

		index: function(req, res){
			console.log("index requested");
			Customer.find({}, {'_id':0}).exec(function(err, customers){
				res.json(customers);
			})
		},

		findOne: function(req, res, fid){
			console.log("findOne requested", fid);
			Customer.findOne({_id:fid}, {'_id':0}).exec(function(err, customers){
				res.json(customers);
			})
		},

		addCustomers: function(req, res){
			console.log("file uploading...");
			console.log("file info: ", req.file.originalname);
			var obj = xlsx.parse("fileUpload/" + req.file.filename);
			console.log(obj[0].data);
			var customer = Customer({name: req.file.originalname, data: obj[0].data});
			customer.save(function(err, data){
				if(err){
					console.log("DB save error: ", err);
				}else{
					console.log("saved data ID: ", data._id);
					module.exports.findOne(req, res, data._id);
				}
			})
		}
	}
})();