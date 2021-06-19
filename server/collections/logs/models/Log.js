const config = require('../../../config.json');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = () =>
{
	const LogSchema = new Schema
	({
		input: {type: String, required: true},
		response:
		[
			{type: String, required: true}
		],
		date: {type: Date, required: true}
	});

	let db = mongoose.connection.useDb(config.db.name);
	return db.model('logs', LogSchema);
}