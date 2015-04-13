## [Launch](https://github.com/isaacwebfix/launch)

Launch is a simple front-end boilerplate created by [Isaac Rankin](http://isaacrankin.com/).

It basically extends [HTML5 boilerplate](https://html5boilerplate.com/).

It includes popular front-end technologies such as jQuery, Foundation, Modernizr and Normalize.css, tied together with a Grunt build.

###Installation & Usage

Before starting, check you have all the dependencies installed (listed below).

1. Install vendor libraries

		bower install

2. Install build dependencies

		npm install

3. Run Grunt

		grunt

4. Watch for file changes with Grunt.
This only complies working JS and SCSS.

		grunt watch

###Add New Vendor Libraries/Packages

1. User [bower to install](http://bower.io/#install-packages) the package, e.g. `bower install package-name --save`
2. Update `config.json` to include the new library, add it to `vendorFiles`
3. Re-compile with `grunt`

If there is no [bower component](http://bower.io/search/), copy the files manually to `vendor` and update the `.gitignore` file so they are tracked. Then follow steps 2 and 3.

###Dependencies

* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)

###Features & Integrated Technologies

-   [Grunt](http://gruntjs.com/) for the build process
-   [Bower](http://bower.io/) for package management
-   [SASS](http://sass-lang.com/)
-   [Normalize.css](http://necolas.github.io/normalize.css/)
-   [Foundation](http://foundation.zurb.com/docs/components/grid.html) - the entire Foundation framework is available but only the grid is used by default.
-   JavaScript
	-   [jQuery](http://jquery.com/)
	-   [Modernizr](http://modernizr.com/)