
var vm= function(){
	self.records=ko.observableArray([]);
	self.records1=ko.observableArray([]);
	self.data=ko.observableArray([]);
	self.teams=ko.observableArray([]);

	self.activate = function (settings) {
        console.log('CALL: Games...');
		$.ajax(settings).done(function (response) {
			self.records(response);
			self.data(self.records().data);
			console.log(self.data());
		});
		$.ajax("http://192.168.160.58/NBA/API/Teams?page=1&pageSize=61").done(function (response) {
			self.records1(response);
			self.teams(self.records1().Records);
			console.log(self.teams());
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
