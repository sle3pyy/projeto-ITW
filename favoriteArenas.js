// ViewModel KnockOut
var vm = function () {
    
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    
    self.searchb = ko.observable('');
    console.log("did it");
    self.baseUri = ko.observable('http://192.168.160.58/NBA/api/Arenas');
    self.displayName = 'NBA Favorite Arenas List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.favoriteArenas = function (id) {
    var c = JSON.parse(window.localStorage.getItem('favArenas0'))
            for (var i = 0; i < c.length; i++) {                   
                if (id == c[i].Id) {
                    c.splice(i, 1); // remove the item at index i
                    window.localStorage.setItem('favArenas0', JSON.stringify(c)); // update the local storage
                    console.log('Arena unfavourited')
                    $('#fav_'+id).removeClass('text-danger')
                    self.activate(); 
                    return false
                }
            }
    } 
    //--- Page Events
    self.activate = function () {
        console.log('CALL: getArenas...');
        if (JSON.parse(window.localStorage.getItem('favArenas0')) == null) {
            self.records(null)
        } else {
            console.log('checking which Arenas were favourited')
            var arenasList = [];
            var favArenasList = JSON.parse(window.localStorage.getItem('favArenas0'));
            var a = favArenasList.length;
            console.log(favArenasList)
            for (var i = 0; i < a; i++) {
                arenasList.push(favArenasList[i])
            }
            self.records(arenasList)
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
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
    
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
    $("#searchb").autocomplete({
        minLength: 1,
        autoFill: true,
        source: function (request, response) {
            $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/NBA/api/Arenas/Search?q='+ $("#searchb").val(),
                success: function (data) {
                    response($.map(data, function (item) {
                        return item.Name;
                    }));
                },
                error: function(result) {
                    alert(result.statusText);
                },
            });
        },
        select: function (e, ui) {
            $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/NBA/api/Arenas/Search?q=' + ui.item.label,
                success: function (data) {
                    window.location = 'arenaDetails.html?id=' + data[0].Id;
                }
            })
        },
        messages: {
            noResults: '',
            results: function() {}
        }
    });
    $("#clearFavourites").click(function() {
        if (!(JSON.parse(window.localStorage.getItem('favArenas0')) == null)) {
            window.localStorage.clear()
            window.location.reload()
        } else {
            alert("No favourites to clear")
        }
    });
});
