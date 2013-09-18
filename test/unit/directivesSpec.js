'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('myApp.directives'));

  describe('flip-switch', function() {
    it('should render', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<div flip-switch config="flipSwitchConfig"></div>')($rootScope);
        console.log(element.find('select'));
        expect(1).toEqual(2);
//        element.find('select');
      });
    });
  });

});
