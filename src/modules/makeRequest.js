
export default function makeRequest(method, url, data) {

	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest();

		xhr.open(method, url);
		if (method === 'POST') xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(JSON.parse(xhr.response));
			} else {
				reject({
					status: xhr.status,
					statusText: xhr.statusText
				});
			};
		};

		xhr.onerror = () => {
			reject({
				status: xhr.status,
				statusText: xhr.statusText
			});
		};

		if (method === 'POST') {
			data ? xhr.send(JSON.stringify(data)) : xhr.send();
		} else {
			xhr.send(); // GET
		};

	});

};