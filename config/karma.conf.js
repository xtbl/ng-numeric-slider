module.exports = function(config) {
	config.set({
		basePath: '../',
		frameworks: ['jasmine'],
		files: [
            'app/lib/jquery/jquery-1.10.2.min.js',
            'app/lib/jquery-mobile/jquery.mobile-1.3.2.min.js',
			'app/lib/angular/angular.js',
			'app/lib/angular/angular-*.js',
			'test/lib/angular/angular-mocks.js',
			'app/js/**/*.js',
			'test/unit/**/*.js'
		],
		autoWatch: true,
		browsers: ['Chrome'],
        preprocessors: {
            'templates/**/*.html': 'ng-html2js'
        },
		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}
	});
}