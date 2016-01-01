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

	
	/* Test suite: "The menu" */
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
		
		/* ADDITIONAL TEST: Menu gets hidden 
		* when a (new) feed is selected from the menu.
		*/
		it('visibility toggles when a feed is selected', function() {
			var menuIcon = $('.menu-icon-link');
			var feedListLink = $('ul.feed-list > li > a:last');
			
			/* Click 1: Opening menu by clicking the icon
			* 'menu-hidden' class has to be removed from body.
			*/
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(false);
			
			/* Click 2: Selecting a feed by clicking it in
			* the menu. The 'menu-hidden' class has to be added
			* to the body.
			*/
			feedListLink.click();
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});
	
	
	/* Test suite: "Initial Entries" */
	describe('Initial Entries', function() {
		/* Test: When the loadFeed function is called and completes 
		* its work, there is at least a single .entry element within
		* the .feed container.
		*/
		
		// Variables for nestled test suite "New Feed Selection"
		var entryBefore;
		var entryAfter;
		
		// Call loadFeed async.
		beforeEach(function(done) {
			loadFeed(0, function() {
				entryBefore = $('.entry > h2:first').html();
				done();
			});
		});
		
		it('are loaded', function(done) {
			// Get all elements with class .feed that have a .entry child element.
			var feedContainer = $('.feed').has('.entry');
			
			// If loadFeed worked there has to be at least one such container.
			expect(feedContainer.length).not.toBe(0);
			done();
		});
	
	
		/* Test suite: "New Feed Selection" */
		describe('New Feed Selection', function(){
			/* Test: When a new feed is loaded by the loadFeed function 
			* the content actually changes.
			*/
			
			beforeEach(function(done) {
				$('.feed').empty();
				
				loadFeed(2, function() {
					entryAfter = $('.entry > h2:first').html();
					done();
				});
			});
			
			// Reset the loaded feed to feed index 0
			/* afterEach(function() {
				$('.feed').empty();
				loadFeed(0);
			}); */
			
			it('changes content', function(done) {
				expect(entryAfter).not.toBe(entryBefore);
				done();
			});
			
		});
	});
	
	
	/* ADDITIONAL TEST SUITE:  "Article Preview" */
	describe('Article Preview', function() {
		/* Test: 
		*/
		var entryLink,
			entry,
			contentSnippet;
		
		beforeEach(function(done) {
			loadFeed(0, function() {
				entryLink = $('.entry-link:first');
				entry = $('.entry-link:first > .entry');
				contentSnippet = $('.entry-link:first > .entry > p');
				done();
			});
		});
		
		it('has content', function(done) {
			expect(contentSnippet.html()).toBeTruthy();
			done();
		});
		
		it('has a link to the complete article', function(done) {
			expect(entry.has('a').length).not.toBe(0);
			done();
		});
		
		it('is hidden by default', function(done) {
			expect(contentSnippet.hasClass('hide')).toBe(true);
			done();
		});
		
		it('visibility toggles on click', function(done) {
			//entryLink.click();
			expect(contentSnippet.hasClass('hide')).toBe(false);
			
			//entryLink.click();
			expect(contentSnippet.hasClass('hide')).toBe(true);
			done();
		});	
	});
}());
