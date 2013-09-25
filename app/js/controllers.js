'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('numericSliderCtrl',['$scope', function($scope) {
    $scope.numericSliderConfig = { "help":"helpurl", "minValue":0,"maxValue":100, "step": 5 };
  }]);