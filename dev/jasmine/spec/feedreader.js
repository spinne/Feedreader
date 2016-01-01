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
			
			/* Click 1: Opening menu by clicking the icon,
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
				// Populate entryBefore for "New Feed Selection"
				entryBefore = $('.entry:first > h2').html();
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
	
	
		/* Test suite: "New Feed Selection" 
		* Why I nestled it: See README.
		*/
		describe('New Feed Selection', function(){
			/* Test: When a new feed is loaded by the loadFeed function 
			* the content actually changes.
			*/
			
			beforeEach(function(done) {
				$('.feed').empty();
				
				loadFeed(2, function() {
					// Populate entryAfter
					entryAfter = $('.entry:first > h2').html();
					done();
				});
			});
			
			// Compare entryBefore with entryAfter
			it('changes content', function(done) {
				expect(entryAfter).not.toBe(entryBefore);
				done();
			});
			
		});
	});
	
	
	/* ADDITIONAL TEST SUITE:  "Article Preview" */
	describe('Article Preview', function() {
		/* Test: For new feature "article preview" make sure
		* each .entry has a content snippet from the article in its
		* p element. It should also contain a link to the full article.
		* That this content snippet is hidden by default, shows
		* up when the enclosing .entry-link is clicked and hides 
		* again when the .entry-link is clicked a second time.
		*/
		var entryLink,
			entry,
			contentSnippet;
		
		// Needs to be async - to populate the .feed div
		beforeEach(function(done) {
			loadFeed(0, function() {
				entryLink = $('.entry-link:first');
				entry = $('.entry-link:first > .entry');
				contentSnippet = $('.entry-link:first > .entry > p');
				done();
			});
		});
		
		// ContentSnippet isn't empty, null, undefined or 0.
		it('has content', function(done) {
			expect(contentSnippet.html()).toBeTruthy();
			done();
		});
		
		// Contains at least one link (to the full article -> maybe class selector)
		it('has a link to the complete article', function(done) {
			expect(entry.has('a').length).not.toBe(0);
			done();
		});
		
		// Is hidden with a class that is set by default
		it('is hidden by default', function(done) {
			expect(contentSnippet.hasClass('hide')).toBe(true);
			done();
		});
		
		/* Visibility is toggled (add/remove class) when clicking
		* the enclosing entryLink.
		* Can't simulate a click on any element with in the entryLink
		* because this triggers the current link to the full article.
		* -> Click simulation commented out.
		*/
		it('visibility toggles on click', function(done) {
			//entryLink.click();
			expect(contentSnippet.hasClass('hide')).toBe(false);
			
			//entryLink.click();
			expect(contentSnippet.hasClass('hide')).toBe(true);
			done();
		});	
	});
}());
