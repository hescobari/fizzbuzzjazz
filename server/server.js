const config = require('./config.json');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();

app.use(cors(
{
	origin: config.app.domain,
	credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use(require('./routes'));

const upload = multer();
app.use(upload.array());

// Mongoose Connection
mongoose.set('useCreateIndex', true);
mongoose.connect
(
	`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.cluster}.${config.db.server}.mongodb.net/${config.db.name}?retryWrites=true&w=majority`, 
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
).then(() => 
{
	const server = http.createServer(app);
	server.listen(config.server.port, config.server.domain, () =>
	{
		console.log(`Listening on port: ${config.server.port}`);
	});
}).catch(err =>
{
	console.log(err);
});