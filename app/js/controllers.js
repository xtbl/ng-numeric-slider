'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('numericSliderCtrl',['$scope', function($scope) {
    $scope.numericSliderConfig = { "stateLabels" : {"first":'ON', "second":'OFF'} };
  }]);