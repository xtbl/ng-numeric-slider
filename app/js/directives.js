'use strict';

/* Directives */

/**
 * Numeric Slider object
 */
    var numericSlider = function ($scope, options, $templateCache, $http, $q) {
        var defaults = {
            "label": 'Check Every',
            "minValue": 0,
            "maxValue": 100,
            "help" : undefined,
            "stateLabels" : {"first":'ON', "second":'OFF'},
            // default directive template
            "ngNumericSlider": "ngNumericSlider"
        };
        var self = this;

        console.log('defaults: '+JSON.stringify(defaults));
        console.log('options: '+JSON.stringify(options));


        self.config = $.extend(defaults, self.config, options);
        console.log('self.config: '+JSON.stringify(self.config));

    self.config.numSliderHover = false;
    self.config.itemHovered = function() {
        $scope.numericSliderConfig.numSliderHover = !$scope.numericSliderConfig.numSliderHover;
        console.log('item hovered');
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
                $scope.numericSliderConfig.itemHovered = self.config.itemHovered;
                $scope.numericSliderConfig.numSliderHover = self.config.numSliderHover;

                $scope.numericSliderConfig.help = self.config.help;
                console.log('self.config: '+ JSON.stringify(self.config) );
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
        // Todo:
        // transclude, add external attributes, watch, model
        //template: '<label for="slider-fill">Input slider:</label><input type="range" name="slider-fill" id="slider-fill" value="60" min="0" max="100" data-highlight="true" />',
        // Todo: use defaults to compile then watch if there are config values set
        compile: function(element, attrs) {
            // returns link function
            return function (scope, iElement, iAttrs) {
                var numSlider = new numericSlider(scope, scope.numericSliderConfig, $templateCache, $http, $q);
                numSlider.init().then(function(){
                    //console.log('after numSlider.init()');
                    iElement.append($compile($templateCache.get('templates/ngNumericSlider.html'))(scope));
                    //console.log('TEMPLATE: '+ $templateCache.get('templates/ngNumericSlider.html'));
                    element.find('input[data-type="range"]').slider();
                });

                iElement.find('select').bind( "change", function(event, ui) {
                    scope.numericSliderState = scope.numericSliderSelect;

                });
                //element.find('input[type="range"]').page('destroy').page();

            }
        }
    };
  }]);
