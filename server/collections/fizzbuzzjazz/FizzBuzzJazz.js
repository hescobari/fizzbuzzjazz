// Controllers
const Log = require('../logs/controllers/Log');

class FizzBuzzJazz
{
	static Generate = async (req, res) =>
	{
		let cases = [];
		const n = req.params.id;

		for (let i = 1; i <= n; i++)
		{
			let text = '';

			if(i % 3 === 0)
			{
				text = 'Fizz';
			}

			if(i % 5 === 0)
			{
				text = `${text}Buzz`;
			}

			if(i % 7 === 0)
			{
				text = `${text}Jazz`;
			}

			if(!text)
			{
				text = i
			}

			cases[(i - 1)] = text
		}

		const log = await Log.Create(n, cases);

		const data =
		{
			cases: cases,
			log: log
		}

		res.send(data)
	}
}

module.exports = FizzBuzzJazz;