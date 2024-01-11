// ViewModel KnockOut
var vm = function () {
    
    console.log('ViewModel initiated...');

    var self = this;
    
    self.searchb = ko.observable('');
    self.baseUri = ko.observable('http://192.168.160.58/NBA/api/Players');
    self.displayName = 'NBA Favorite Players List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.favoritePlayers = function (id) {
        var c = JSON.parse(window.localStorage.getItem('favPlayers0'))
            for (var i = 0; i < c.length; i++) {                   
                if (id == c[i].Id) {
                    c.splice(i, 1); // remove the item at index i
                    window.localStorage.setItem('favPlayers0', JSON.stringify(c)); // update the local storage
                    console.log('Player unfavourited')
                    $('#fav_'+id).removeClass('text-danger')
                    self.activate(); 
                    return false
                }
            }
    } 
    
    //--- Page Events
    self.activate = function () {
        console.log('CALL: Players...');
        if (JSON.parse(window.localStorage.getItem('favPlayers0')) == null) {
            self.records(null)
        } else {
            console.log('checking which Players were favourited')
            var playersList = [];
            var favPlayersList = JSON.parse(window.localStorage.getItem('favPlayers0'));
            var a = favPlayersList.length;
            console.log(a,favPlayersList)
            for (var i = 0; i < a; i++) {
                console.log(favPlayersList[i])
                playersList.push(favPlayersList[i])
            }
            self.records(playersList)
        }
        hideLoading();
        console.log(self.records())
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

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

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    self.activate();
    console.log("VM initialized!");
    
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
    $("#clearFavourites").click(function() {
        if (!(JSON.parse(window.localStorage.getItem('favPlayers0')) == null)) {
            window.localStorage.clear()
            window.location.reload()
        } else {
            alert("No favourites to clear")
        }
    });
});
