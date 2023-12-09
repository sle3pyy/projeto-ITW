const settings = {
	async: true,
	crossDomain: true,
	url: 'https://api-nba-v1.p.rapidapi.com/seasons',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '333f3343bamshe77bbbb8722c2d0p1611a4jsnc97fdf9ec78c',
		'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});