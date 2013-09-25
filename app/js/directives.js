'use strict';

/* Directives */

/**
 * Numeric Slider object
 */
    var numericSlider = function ($scope, options, $templateCache, $http, $q, $compile, elm) {
        var defaults = {
            "label": 'Check Every',
            "minValue": 0,
            "maxValue": 100,
            "units":'seconds',
            "step": 1,
            "help" : undefined,
            "isEditable": false,
            "currentValue":50,
            // default directive template
            "ngNumericSlider": "ngNumericSlider"
        };
        var self = this;

        self.config = $.extend(defaults, self.config, options);

    self.config.numSliderHover = false;

    self.config.itemHovered = function() {
        $scope.numericSliderConfig.numSliderHover = !$scope.numericSliderConfig.numSliderHover;
    };
    self.config.editInput = function() {
        $scope.numericSliderConfig.isEditable = !$scope.numericSliderConfig.isEditable;

        $scope.$watch('currentValue', function () {
            // check value has numbers only
            $scope.currentValue = $scope.currentValue.toString().replace(/[a-zA-Z]/g,'');
            // snap numbers small and big numbers to the closest value inside range when the user finishes editing
            if ($scope.currentValue < $scope.numericSliderConfig.minValue) {
                $scope.currentValue =$scope.numericSliderConfig.minValue;
            } else if($scope.currentValue > $scope.numericSliderConfig.maxValue) {
                $scope.currentValue =$scope.numericSliderConfig.maxValue;
            }
        });

        return $scope.numericSliderConfig.isEditable;
    };

    self.initTemplates = function() {
        var templates = ['ngNumericSlider'];
        var promises = [];
        angular.forEach(templates, function(template) {
            promises.push( self.getTemplate(template) );
        });

        return $q.all(promises);
    };

    self.getTemplate = function (key) {
        var t = self.config[key];
        var tmplBaseDir = 'templates/';
        var uKey = tmplBaseDir + key + ".html";
        var p = $q.defer();
        if (t) {
            $http.get(uKey, {
                cache: $templateCache
            })
                .success(function(data){
                    $templateCache.put(uKey, data);
                    p.resolve();
                })
                .error(function(err){
                    p.reject("Could not load template: " + t);
                });
        } else if (t) {
            $templateCache.put(uKey, t);
            p.resolve();
        } else {
            var dKey = key + ".html";
            $templateCache.put(uKey, $templateCache.get(dKey));
            p.resolve();
        }

        return p.promise;
    };

        self.init = function () {
            return self.initTemplates().then(function () {
                $scope.numericSliderConfig.label = self.config.label;
                $scope.numericSliderConfig.minValue = self.config.minValue;
                $scope.numericSliderConfig.maxValue = self.config.maxValue;
                $scope.numericSliderConfig.units = self.config.units;
                $scope.numericSliderConfig.step = self.config.step;
                $scope.numericSliderConfig.unitsInitial = self.config.units.charAt(0);

                $scope.numericSliderConfig.itemHovered = self.config.itemHovered;
                $scope.numericSliderConfig.numSliderHover = self.config.numSliderHover;
                $scope.numericSliderConfig.editInput = self.config.editInput;
                $scope.currentValue = self.config.currentValue;

                $scope.numericSliderConfig.help = self.config.help;
                elm.append($compile($templateCache.get('templates/ngNumericSlider.html'))($scope));
            });
        }
    };
/**
 * Numeric Slider object ends
 */

angular.module('myApp.directives', []).
  directive('numericSlider', ['$compile','$templateCache','$http','$q', function($compile, $templateCache, $http, $q) {
    return {
        restrict:'A',
        scope: true,
        replace: false,
        compile: function(element, attrs) {
            // returns link function
            return function (scope, iElement, iAttrs) {
                var numSlider = new numericSlider(scope, scope.numericSliderConfig, $templateCache, $http, $q, $compile, iElement);
                numSlider.init().then(function(){
                    scope.$watch('numericSliderConfig.minValue',function () {
                        iElement.find('a.ui-slider-handle').attr('aria-valuemin', scope.numericSliderConfig.minValue);
                        iElement.find('a.ui-slider-handle').attr('aria-valuemax', scope.numericSliderConfig.maxValue);
                        iElement.find('input[data-type="range"]').slider('refresh');
                    });
                    iElement.find('input[data-type="range"]').slider();
                });

            }
        }
    };
  }]);
