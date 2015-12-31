/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		* allFeeds variable has been defined and that it is not
		* empty.
		*/
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* Test: AllFeeds have a URL defined
		* and the URL is not empty.
		*/
		it('have names', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				
				// URL isn't empty, null, undefined or 0
				expect(feed.url).toBeTruthy();
			});
		});


		/* Test: AllFeeds have a name defined 
		* and it is not empty.
		*/
		it('have URLs', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				
				// Name isn't empty, null, undefined or 0
				expect(feed.name).toBeTruthy();
			});
		});
		
	});

	
	/* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {
		/* Menu visibility is managed by toggling the css class 
		* 'menu-hidden' on body.
		*/
		var body = $('body');
		
		/* Test: Menu element is hidden by default.
		* Without any click events - the body must have 'menu-hidden' to 
		* have menu hidden by default.		
		*/
		it('is hidden by default', function() {
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		/* Test: Menu changes visibility when the menu icon is clicked.
		* Expectations: Menu displays when menu icon is
		* clicked and hides when clicked again.
		*/
		it('visibility toggles on clicking menu icon', function() {
			var menuIcon = $('.menu-icon-link');
			
			// Click 1: 'menu-hidden' has to be removed from body.
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(false);
			
			// Click 2: 'menu-hidden' has to be added to body.
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});
	
	
	/* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* TODO: Write a test that ensures when the loadFeed
		* function is called and completes its work, there is at least
		* a single .entry element within the .feed container.
		* Remember, loadFeed() is asynchronous so this test will require
		* the use of Jasmine's beforeEach and asynchronous done() function.
		*/
		
		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});
		
		it('are loaded', function() {
			// Get all elements with class .feed that have a .entry child element.
			var feedContainer = $('.feed').has('.entry');
			
			// If loadFeed worked there has to be at least one such container
			expect(feedContainer.length).not.toBe(0);
			
			//done();
		});
		
	});
	/* TODO: Write a new test suite named "New Feed Selection"

		/* TODO: Write a test that ensures when a new feed is loaded
		* by the loadFeed function that the content actually changes.
		* Remember, loadFeed() is asynchronous.
		*/
}());
