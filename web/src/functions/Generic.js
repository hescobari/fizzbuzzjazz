class Generic
{
	static Fetch = (url, data, method='GET') =>
	{
		let options =
		{
			method: method,
			credentials: 'include',
			headers: new Headers()
		}

		if(method !== 'GET' && method !== 'DELETE')
		{
			let formData = new FormData();
			formData.append('data', JSON.stringify(data));

			options.body = formData
		}

		const response = fetch(url, options).then(response =>
		{
			return response.json();	
		}).catch(e =>
		{
			console.log(e);
		}).then(data =>
		{
			return data;
		}).catch(e =>
		{
			console.log(e);
		});

		return response;
	}
}

export default Generic;