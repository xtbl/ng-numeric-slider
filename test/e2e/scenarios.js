'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('angular numeric-slider', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

    // render the slider
    // click on slider changes the value
    //
    // click on current value label turn it editable
    // mouse over on current value label cause a highlight
    // add value to current value label
    // Alphabetic entries in the value text field should be prohibited
    // numbers that are either too large or too small should ‘snap’ to the closest value when the user finishes editing


    it('should render the slider directive', function() {
        expect(element('a.ui-slider-handle').html()).toBeDefined();
    });

    it('should render slider min and max', function() {
        console.log('slider min is: ' + element('input[type="range"]').attr('min'));
        console.log('slider max is: ' + element('input[type="range"]').attr('max'));
        expect(element('input[type=range]').attr('min')).toBe('0');
        expect(element('input[type=range]').attr('max')).toBe('100');
    });

    it('should display the current value label', function() {
        expect(element('.current-value-label').html()).toContain('Current Value Label');
    });

    it('click on current value label should turn it editable', function() {
        element('.current-value-label').click(); // maybe could use model
        expect(element('.current-value-label').html()).toNotContain('readonly');
    });

    it('mouse over on current value label should highlight', function() {
        element('.current-value-label').mouseover(); // maybe could use model
        expect(element('div.current-value-container').class()).toContain('edit-highlight');
    });

    it('add value to current value label', function() {
        element('.current-value-label').click();
        //element('.current-value-label').enter('5');
        expect(element('a.ui-slider-handle').attr('aria-valuenow')).toBe('5');
    });

    it('alphabetic entries in the value text field should be prohibited', function() {
        element('.current-value-label').click();
        //element('.current-value-label').enter('a');
        expect(element('a.ui-slider-handle').attr('aria-valuenow')).not.toBe('a');
    });

    it('numbers that are either too large or too small should "snap" to the closest value when the user finishes editing', function() {
        element('.current-value-label').click();
        element('.current-value-label').enter('1000');
        expect(element('a.ui-slider-handle').attr('aria-valuenow')).toBe('100');
    });

});
