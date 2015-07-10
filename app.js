(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./ng-app');



},{"./ng-app":2}],2:[function(require,module,exports){
var config, ngModule;

config = require('../config/config');

module.exports = (ngModule = angular.module('app', [])).name;

ngModule.config([
  '$provide', (function($provide) {
    $provide.decorator('$browser', [
      '$delegate', (function($delegate) {
        $delegate.onUrlChange = (function() {});
        $delegate.url = (function() {
          return "";
        });
        return $delegate;
      })
    ]);
  })
]);

ngModule.controller('sidebarCtrl', [
  '$rootScope', '$http', '$scope', (function($rootScope, $http, $scope) {
    $http({
      method: 'GET',
      url: config.server.base + "/public/api/get/TszhContact@1"
    }).success((function(data) {
      $rootScope.tszhContact = data;
    }));
    $http({
      method: 'GET',
      url: config.server.base + "/public/api/list/ServiceCompany?t=list"
    }).success((function(data) {
      $rootScope.serviceCompanyList = data.list;
    }));
  })
]);

ngModule.controller('noteCtrl', [
  '$rootScope', '$http', '$scope', (function($rootScope, $http, $scope) {
    $http({
      method: 'GET',
      url: config.server.base + "/public/api/list/ItemA?t=list"
    }).success((function(data) {
      $rootScope.noteList = data.list;
    }));
  })
]);

ngModule.controller('documentListCtrl', [
  '$rootScope', '$http', '$scope', (function($rootScope, $http, $scope) {
    $http({
      method: 'GET',
      url: config.server.base + "/public/api/list/ItemB?t=list"
    }).success((function(data) {
      $rootScope.documentList = data.list;
      console.log(data);
    }));
  })
]);

ngModule.directive('yandexMap', [
  (function() {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var init;
        init = (function() {
          var lat, lon, myMap;
          lat = 56.740388;
          lon = 37.222808;
          myMap = new ymaps.Map("map", {
            center: [lat, lon],
            zoom: 16
          });
          myMap.controls.add('zoomControl', {
            left: 5,
            top: 15
          });
          myMap.balloon.open([lat, lon], 'Дубна, ул.Университетская 17', {
            closeButton: false
          });
        });
        ymaps.ready(init);
      }
    };
  })
]);

ngModule.filter('phone', function() {
  return function(input) {
    var EditPhone, number, numberEdited;
    number = input || '';
    if (angular.isArray(number)) {
      return;
    }
    numberEdited = number.trim().replace(/[-\s\(\)]/g, '');
    EditPhone = function(num) {
      var area, cod, local;
      cod = "" + num.slice(0, 2);
      area = "(" + num.slice(2, 5) + ")";
      local = num.slice(5, 8) + "-" + num.slice(8);
      num = cod + " " + area + " " + local;
      return num;
    };
    if (numberEdited.length === 12 && ("" + numberEdited.slice(0, 2)) === '+7') {
      return EditPhone(numberEdited);
    } else {
      return number;
    }
  };
});



},{"../config/config":3}],3:[function(require,module,exports){
module.exports = {
  server: {
    base: 'http://admin.druzhba3.delightsoft.ru'
  }
};



},{}]},{},[1]);
