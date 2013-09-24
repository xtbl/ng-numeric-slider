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
        expect(element('a.ui-slider-handle').count()).toBeGreaterThan(0);
    });

    it('should render slider min and max', function() {
        expect(element('input[data-type="range"]').attr('min')).toBe('0');
        expect(element('input[data-type="range"]').attr('max')).toBe('100');
    });

    it('should display the current value label', function() {
        expect(element('input[data-type="range"]').count()).toBeGreaterThan(0);
    });

    it('mouse over on current value label should highlight', function() {
        element('input[data-type="range"]').mouseover();
        expect(element('input[data-type="range"]').attr('class')).toContain('editHighlight');
    });

    it('click on current value label should turn it editable', function() {
        expect(element('input[data-type="range"]').attr('readonly')).toBe('readonly');
        element('input[data-type="range"]').click();
        expect(element('input[data-type="range"]').attr('readonly')).toBe(undefined);
    });

    it('should be able to enter a value to current value label', function() {
        expect(element('input[data-type="range"]').attr('readonly')).toBe('readonly');
        element('input[data-type="range"]').click();
        input('currentValue').enter('5');
        expect(input('currentValue').val()).toBe('5');
    });

    it('alphabetic entries in the value text field should be prohibited', function() {
        element('input[data-type="range"]').click();
        input('currentValue').enter('asdfdre5asd');
        expect(input('currentValue').val()).toBe('5');
    });

    it('numbers that are either too large or too small should "snap" to the closest value when the user finishes editing', function() {
        element('.current-value-label').click();
        element('.current-value-label').enter('1000');
        expect(element('a.ui-slider-handle').attr('aria-valuenow')).toBe('100');
    });

});
