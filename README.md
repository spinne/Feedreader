# Feedreader - Javascript Testing + TDD
##### Udacity FEND Feedreader (Project 6)

The Feedreader is a javascript RSS-Feed reader, which is tested with
*Jasmine* to ensure it is working correctly and that future features do
not break the current functionality.

## How to use it
* Use the live version at http://spinne.github.io/Feedreader
* Download the Git Repo and open either **dist/index.html** or
the development version **dev/index.html** in a browser.

The Feedreader is located at the top of the page and the Jasmine
results can be found at the bottom.

## Dependencies & Resources
The Feedreader and Jasmine tests are built with:
* jQuery 2.1.1
* Jasmine 2.1.2
* handlebars 2.0.0

It also calls:
* Google JS API - _probably_ to collect the RSS-Feeds
* rsstojson.udacity.com/parseFeed - _probably_ to parse the RSS-Feeds

## Jasmine Tests
The project rubric calls for 7 tests that have to be passed:

##### Test Suite 'RSS Feeds'
* `allFeeds` variable is defined and not empty (test was already set up)
* each feed in `allFeeds` has a `allFeeds[index].url` property defined and it isn't empty
* each feed in `allFeeds` has a `allFeeds[index].name` property defined and it isn't empty

##### Test Suite 'The menu'
* is hidden by default
* visibility toggles when clicking the menu icon

##### Test Suite 'Initial Entries'
* are loaded when `loadFeed()` function is called. Tested by checking if `.feed` element
has at least one `.entry` child element.

##### Test Suite 'New Feed Selection'
* actually changes the content of the `.entry` elements.

##### Notice: I nestled 'New Feed Selection' within the 'Initial Entries' test suite.


``` javascript
describe('Initial Entries', function() {
    beforeEach(...);
    it('are loaded', ...);
    
    describe('New Feed Selection', function () {
        beforeEach(...);
        it('changes content', ...);
    });
});
```

###### The function calls for 'New Feed Selection'**
`beforeEach('Initial Entries')` -> `beforeEach('New Feed Selection')` -> `it('New Feed Selection')`

The reason I nestled 'New Feed Selection' is that I had trouble 
calling `loadFeed()` twice asynchronously with in one `beforeEach()` 
function. By nestling the 'New Feed Selection' the `beforeEach()` 
function from 'Initial Entries' is call before any of the 
'New Feed Selection' tests. Which makes it easy to populate two 
variables with content from two different `loadFeed()` calls.

**All required specs pass.**


### Additional Tests
#### Test Suite 'The menu'
* Added test to ensure the menu gets hidden when a feed is selected from it. 
Line 89 in **dev/index.html**: `it('visibility toggles when a feed is selected', function() {});`

**This spec passes because the functionality is already implemented.**

#### Test Suite 'Article Preview' - Line 172 in dev/index.html
This suite tests for new feature called "article preview" which
displays a small section of the article within the feedreader app
when the entry is clicked. For it to work:

**- there has to be a content snippet within the `.entry > p`**

The app code actually has the basic structure for this but the p within the 
entry does not get populated.


* **- there has to be a link to the full article within the `.entry`**

This is a very basic test. Just because there is a link in `.entry`
does not mean there is a link to the full article. Which is why I added
a class on the link to the full article and check for this selector.
It might make sense to check if the `href` is set and maybe to put 
the link to the full article within the `.entry > p` - but this would
mean the link is hidden until the content snippet is shown. I would
test if a permanent link to the full article is usable / useful or not.

* **- it is hidden by default**

I think for this and the next spec a class that manages visibility
is the best option. Which is why I test for the class.

* **- visibility of the content snippet toggles when clicked**

This test should check if the class managing the visibility is
toggled when the `.entry` or its surrounding element `.entry-link`
is clicked. If clicked for the first time the class is removed, if clicked
again the class is added. But I **cannot simulate the click event** because
this triggers the current link to the full article. So I had to comment
out the click events. When developing this feature, changing the `.entry-link`
implementation would have to be _the first thing_ done. 

**All specs in this test suite fail**

## Issues
In Firefox 6 out of 12 tests fail because Firefox does not process
the jQuery selectors with in the asynchronous callback function.
If it had to pass in Firefox too, all selectors within the callbacks
had to be rewritten in plain Javascript.
