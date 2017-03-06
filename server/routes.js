module.exports = function(app) {

	app.get('/', function(req, res) {
		res.send('Hello World! /')
	})

	app.get('/route', function(req, res) {
		res.send('Hello route!')
	})
}