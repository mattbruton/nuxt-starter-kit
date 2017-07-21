module.exports = {
	afterEach : function(browser, done) {
		browser.sessionLog(function(result) {
			console.log(result);
		}).end(function() {
			done();
		});
	},
	'Test Google' : function (browser) {
		browser
		.maximizeWindow() // If on Linux set window size, max 1920x1080, like .resizeWindow(1920, 1080);
		.url('http://google.com')
		.waitForElementPresent('body', 1000);
	}
};