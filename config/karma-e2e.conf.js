module.exports = function(config) {
	config.set({
		basePath: '../',
        plugins: ['karma-ng-scenario', 'karma-jasmine', 'karma-chrome-launcher','karma-html2js-preprocessor'],
        frameworks: ['ng-scenario'],
		files: [
			'test/e2e/**/*.js'
		],
		autoWatch: false,
		browsers: ['Chrome'],
		singleRun: false,
        autoWatch: true,
        urlRoot: '/_karma_/',
		proxies: {
			'/': 'http://localhost:8000/'
		},
		junitReporter: {
			outputFile: 'test_out/e2e.xml',
			suite: 'e2e'
		}
	});
}

