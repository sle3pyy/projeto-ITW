
var vm= function(){
	self.records=ko.observableArray([]);

	$('#submit').on('click', function(){
		var date = new Date($('#gameDate').val());
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		console.log([day, month, year].join('-'));
		const settings = {
			async: true,
			crossDomain: true,
			url: 'https://free-nba.p.rapidapi.com/games?dates[]='+[day, month, year].join('-'),
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '333f3343bamshe77bbbb8722c2d0p1611a4jsnc97fdf9ec78c',
				'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
			}
		};
		self.activate(settings);
		});


	self.activate = function (settings) {
        console.log('CALL: Games...');
		$.ajax(settings).done(function (response) {
			self.records(response);
			console.log(self.records());
		});
    };

	function todaysGames(){
		const date = new Date();
		let day = date.getDate();
		let month = date.getMonth() + 1;
		let year = date.getFullYear();
		let currentDate = `${day}-${month}-${year}`;
		const settings = {
			async: true,
			crossDomain: true,
			url: 'https://free-nba.p.rapidapi.com/games?dates[]='+currentDate,
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '333f3343bamshe77bbbb8722c2d0p1611a4jsnc97fdf9ec78c',
				'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
			}
		};
		self.activate(settings);
	}
	todaysGames();
    console.log("VM initialized!");

}

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
