const Authentication = require('./controllers/authentication');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.send({ test: '123' });
	});
	app.post('/signin', Authentication.signin);
	app.post('/signup', Authentication.signup);
}