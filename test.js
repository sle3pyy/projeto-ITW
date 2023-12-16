
var vm= function(){
	self.records=ko.observableArray([]);


	self.activate = function () {
        console.log('CALL: Games...');
		$.ajax(settings).done(function (response) {
			self.records(response);
			console.log(self.records());
		});
    };

	function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }


	showLoading();
	self.activate();
    console.log("VM initialized!");

}
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://free-nba.p.rapidapi.com/games?dates[]=2023-12-17',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '333f3343bamshe77bbbb8722c2d0p1611a4jsnc97fdf9ec78c',
		'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
	}
};


$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});