'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('angular flip-switch', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

    it('should render the flip-switch directive', function() {
        expect(element('select').html()).toBeDefined();
    });

    it('should render flip-switch options', function() {
        console.log('select is: ' + element('select').html());
        expect(element('select').html()).toContain('ON');
        expect(element('select').html()).toContain('OFF');
    });

    it('should display the flip-switch label', function() {
        expect(element('label').html()).toContain('Flip Switch Label');
    });

    it('should slide the switch state when "ON" is selected', function() {
        select('flipSwitchSelect').option('on');
        expect(element('.ui-slider-label-a').attr('style')).toBe('width: 100%;');
        expect(element('.ui-slider-label-b').attr('style')).toBe('width: 0%;');
    });

    it('should slide the switch state when "OFF" is selected', function() {
        select('flipSwitchSelect').option('on');
        select('flipSwitchSelect').option('off');
        expect(element('.ui-slider-label-a').attr('style')).toBe('width: 0%;');
        expect(element('.ui-slider-label-b').attr('style')).toBe('width: 100%;');
    });

});
