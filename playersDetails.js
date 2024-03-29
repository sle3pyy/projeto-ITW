﻿// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Players/');
    self.displayName = 'NBA Players Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Name = ko.observable('');
    self.CountryId = ko.observable('');
    self.CountryName = ko.observable('');
    self.Birthdate = ko.observable('');
    self.PositionName = ko.observable('');
    self.PositionId = ko.observable('');
    self.Weight = ko.observable('');
    self.School = ko.observable('');
    self.Height = ko.observable('');
    self.Biography = ko.observable('');
    self.Seasons = ko.observable('');
    self.Teams = ko.observable('');
    self.DraftYear = ko.observable('');
    self.regular = ko.observableArray([])
    self.playoffs = ko.observableArray([])
    self.Photo = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getPlayer...');
        var composedUri = self.baseUri() + id;
        console.log(composedUri);
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Name(data.Name);
            self.CountryId(data.CountryId);
            self.CountryName(data.CountryName);
            self.Birthdate(data.Birthdate);
            self.PositionName(data.PositionName);
            self.PositionId(data.PositionId);
            self.DraftYear(data.DraftYear);
            self.Weight(data.Weight);
            self.School(data.School);
            self.Height(data.Height);
            self.Biography(data.Biography);
            self.Photo(data.Photo);
            self.Seasons(data.Seasons);
            self.Teams(data.Teams);
        });
    };

    self.stats = function(id) {
        console.log('Searching stats for season:', id)
        var composedUri= self.baseUri() + 'Statistics?id=' + self.Id() + '&seasonId=' + id
        console.log(composedUri)
        ajaxHelper(composedUri, 'GET').done(function(data){
            console.log(data);
            hideLoading()
            self.regular(data.Regular)
            self.playoffs(data.Playoff)
            console.log(self.regular(),self.playoffs())
        });
        $('#seasons').hide()
        $('#RegularSeasonStats').show()
    }
    self.change = function() {
        if($('#RegularSeasonStats').is(':visible') && $('#PlayoffSeasonStats').is(':hidden')){
        $('#RegularSeasonStats').hide()
        $('#PlayoffSeasonStats').show()
        }
        else if($('#PlayoffSeasonStats').is(':visible') && $('#RegularSeasonStats').is(':hidden') ){
        $('#RegularSeasonStats').show()
        $('#PlayoffSeasonStats').hide()
        }
    }
    self.back = function() {
    $('#RegularSeasonStats').hide()
    $('#PlayoffSeasonStats').hide()
    $('#seasons').show()
    }

  
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

    function showLoading() {
        $('#myModal').modal('show', {
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

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {

                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
    $('#RegularSeasonStats').hide()
    $('#PlayoffSeasonStats').hide()
    $('#seasons').show()
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})