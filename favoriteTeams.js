// ViewModel KnockOut
var vm = function () {
    
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    
    self.searchb = ko.observable('');
    console.log("did it");
    self.baseUri = ko.observable('http://192.168.160.58/NBA/api/Teams');
    self.displayName = 'NBA Favorite Teams List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.search = function() {
        console.log("searching")
        if ($("#searchb").val() === "") {
            showLoading();
            var pg = getUrlParameter('page');
            console.log(pg);
            if (pg == undefined)
                self.activate(1);
            else {
                self.activate(pg);
            }
        } else {
            var Uri ='http://192.168.160.58/NBA/api/Teams/Search?q='+ $("#searchb").val();
            self.teamslist = [];
        ajaxHelper(Uri, 'GET').done(function(data) {
            console.log(data.length)
            if (data.length == 0) {
                return alert('No results found')
            }
            self.totalPages(1)
            console.log(data);
            showLoading();
            self.records(data);
            self.totalRecords(data.length);
            hideLoading();
            for (var i in data) {
                self.teamslist.push(data[i]);
                }
            });
        };
    };
    //--- Page Events
    self.activate = function () {
        console.log('CALL: getTeams...');
        var composedUri = self.baseUri();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            console.log(composedUri);
            if (JSON.parse(window.localStorage.getItem('favTeams0')) == null) {
                self.records(null)
            } else {
                console.log('checking which Teams were favourited')
                var teamsList = [];
                var favTeamsList = JSON.parse(window.localStorage.getItem('favTeams0'));
                var a = favTeamsList.length;
                console.log(favTeamsList,data.TotalRecords)
                for (var i = 0; i < a; i++) {
                    teamsList.push(favTeamsList[i])
                }
                self.records(teamsList)
            }
            hideLoading();
        });
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
                url: 'http://192.168.160.58/NBA/api/Teams/Search?q='+ $("#searchb").val(),
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
                url: 'http://192.168.160.58/NBA/api/Teams/Search?q=a' + ui.item.label,
                success: function (data) {
                    window.location = 'teamDetails.html?id=' + data[0].Id + '&acronym=' + data[0].Acronym;
                }
            })
        },
        messages: {
            noResults: '',
            results: function() {}
        }
    });
    $("#clearFavourites").click(function() {
        if (!(JSON.parse(window.localStorage.getItem('favTeams0')) == null)) {
            window.localStorage.clear()
            window.location.reload()
        } else {
            alert("No favourites to clear")
        }
    });
});
