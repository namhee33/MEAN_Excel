var customers = require('./../controllers/customers.js');
var multer = require('multer');
var upload = multer({dest: 'fileUpload/'});
var type = upload.single('file');

module.exports = function(app){

	app.get('/index', function(req, res){
		customers.index(req, res);
	});

	app.post('/fileUpload', type, function(req, res){
		customers.addCustomers(req, res);
	});
}