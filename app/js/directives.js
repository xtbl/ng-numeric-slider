'use strict';

/* Directives */

/**
 * Numeric Slider object
 */
    var numericSlider = function ($scope, options) {
        var defaults = {
            "label": 'Flip Switch Label',
            "state" : 'off',
            "help" : undefined,
            "stateLabels" : {"first":'ON', "second":'OFF'}
        };
        var self = this;

        console.log('defaults: '+JSON.stringify(defaults));
        console.log('options: '+JSON.stringify(options));


        self.config = $.extend(defaults, self.config, options);
        console.log('self.config: '+JSON.stringify(self.config));

        self.init = function () {
            $scope.numericSliderConfig.label = self.config.label;
            $scope.numericSliderConfig.state = self.config.state;
            $scope.numericSliderConfig.help = self.config.help;
            $scope.numericSliderConfig.stateLabels = self.config.stateLabels;

            console.log('self.config: '+ JSON.stringify(self.config) );
        }
    };
/**
 * Numeric Slider object ends
 */

angular.module('myApp.directives', []).
  directive('numericSlider', ['$compile','$templateCache', function($compile, $templateCache) {
    return {
        restrict:'A',
        scope: true,
        replace: false,
        // Todo:
        // transclude, add external attributes, watch, model
        template: '<label for="slider-fill">Input slider:</label><input type="range" name="slider-fill" id="slider-fill" value="60" min="0" max="100" data-highlight="true" />',
        // Todo: use defaults to compile then watch if there are config values set
        compile: function(element, attrs) {
            element.find('input').slider();

            // returns link function
            return function (scope, iElement, iAttrs) {
                var numSlider = new numericSlider(scope, scope.numericSliderConfig);
                console.log('values: '+ angular.element(iElement).find('option')[1].innerHTML);
                numSlider.init();
                iElement.find('select').bind( "change", function(event, ui) {
                    console.log('slider change: '+ event);
                    scope.numericSliderState = scope.numericSliderSelect;
                    console.log('switch state: '+ scope.numericSliderState);

                });
            }
        }
    };
  }]);
