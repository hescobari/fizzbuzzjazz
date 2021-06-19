// Models
const LogModel = require('../models/Log');

class Log
{
	static Create = async (input, response) =>
	{
		try
		{
			const data =
			{
				input: input,
				response: response,
				date: new Date()
			} 

			await LogModel().create(data);

			return data;
		}
		catch(e)
		{
			console.log(e.message);

			return false;
		}
	}

	static Read = async (req, res) =>
	{
		let logs = [];

		try
		{
			logs = await LogModel().find().sort({date: -1});
		}
		catch(e)
		{
			console.log(e.message);
		}

		res.send(logs)
	}
}

module.exports = Log;