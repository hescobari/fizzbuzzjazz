import React from "react";

// External
import './external/fontello/css/hescobari.css'

// Functions
import Generic from "./functions/Generic";

// Css
import './App.css';

class App extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state =
		{
			cases: [],
			logs: [],
			input: ''
		}
	}

	componentDidMount()
	{
		this.GetLogs();
	}

	EnterCases = (event) =>
	{
		if(event.keyCode === 13)
		{
			this.GetCases();
		}
	}

	GetCases = () =>
	{
		if(this.state.input)
		{
			Generic.Fetch(`http://192.168.0.3:5000/fizzbuzzjazz/${this.state.input}`).then(response =>
			{
				if(response)
				{
					let logs = this.state.logs;
					logs.unshift(response.log);
	
					this.setState(
					{
						cases: response.cases,
						logs: logs
					})
				}
			});
		}
	}

	BuildCases = () =>
	{
		const cases = this.state.cases.map((cases, key) =>
		{
			const classColor = (isNaN(cases)) ? 'blue' : 'none';

			return <div key={key} className={classColor}>{cases}</div>;
		});

		return cases;
	}

	UpdateInput = (event) =>
	{
		this.setState(
		{
			input: event.target.value
		})
	}

	GetLogs = () =>
	{
		Generic.Fetch(`http://192.168.0.3:5000/logs`).then(response =>
		{
			if(response)
			{
				this.setState(
				{
					logs: response
				})
			}
		});
	}

	BuildLogs = () =>
	{
		const cases = this.state.logs.map((log, key) =>
		{
			return <div key={key} className='log' onClick={() => this.SelectLog(log.response, log.input)}>
						<label><span className='blue'>Cases: </span>{log.input}</label>
						<label><span className='blue'>Date: </span>{log.date}</label>
					</div>;
		});

		return cases;
	}

	SelectLog = (cases, input) =>
	{
		this.setState(
		{
			cases: cases,
			input: input
		})
	}

	render()
	{
		return <div>
					<div className='header'>
						<h1>Fizz Buzz Jazz</h1>
						<h3>Insert number of cases</h3>
						<div>
							<input type='number' placeholder='Ex: 12' onChange={(event) => this.UpdateInput(event)} value={this.state.input} onKeyDown={this.EnterCases}/>
							<button type='button' onClick={this.GetCases}>
								<span className='icon icon-play'></span>
							</button>
						</div>
					</div>
					<div className='content'>
						<div className='section'>
							<label className='title'>Cases</label>
							{this.BuildCases()}
						</div>
						<div className='section'>
							<label className='title'>Logs</label>
							{this.BuildLogs()}
						</div>
					</div>
					<div className='footer'>
						<label>Made by <span className='blue'>Huascar Escobari</span></label>
					</div>
				</div>
	}
}

export default App;
