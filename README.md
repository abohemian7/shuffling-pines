`bower install`
`open src/index.html`


Andrew Boyer

building a web app that allows basic maintenance of guest registry.

The main academic components of the project are setting up
gulp, karma, and getting angular to work with the MVC model we've discussed.

I need to list the build process here!!!!
Build steps... in a console in the root (shuffling-pines) directory:

1- npm install
2- bower install
3- gulp


• readme up to date
• gulpfile with
    • Karma test
    √ jshint tests
    √ concat JS and CSS
    √ uglify JS and minify CSS
    √ liverelead using gulp connect that watches JS, CSS, and HTML
• tests
    • all controllers and services need tests
        • tests for controllers should mock the DOM elements and services
    • find all the spots where you can make a "should" statement and make a test for each


TESTS:

1- should allow you to enter a guest name
2- should allow you to pick a transition date
3- should allow choosing two options for pickup or dropoff
4- should allow to input location of pickup, only if the pickup option is selected
5- if there's no data in localStorage, pre-populate with a few examples on application init
6- submitting the form should save the data as an array of JSON in localStorage


