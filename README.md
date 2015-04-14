## [Launch](https://github.com/isaacwebfix/launch)

Launch is a simple front-end boilerplate created by [Isaac Rankin](http://isaacrankin.com/).

It basically extends [HTML5 boilerplate](https://html5boilerplate.com/).

It includes popular front-end technologies such as SASS, jQuery, Foundation, Modernizr and Normalize.css, tied together with a Grunt build.

###Installation & Usage

1. Install build dependencies (auto runs `bower install`)

		npm install

2. Run Grunt

		grunt

4. Watch for file changes with Grunt.

		grunt watch

If these steps failed, check that you have all the dependencies installed.

###Add New Vendor Libraries/Packages

1. Use [bower to install](http://bower.io/#install-packages) the package, e.g. `bower install package-name --save`
2. Update `config.json` to include the new library, add it to `vendorFiles`
3. Re-compile with `grunt`

If there is no [bower package](http://bower.io/search/), copy the files manually to `vendor` and update the `.gitignore` file so they are tracked. Then follow steps 2 and 3.

###Dependencies

* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)

###Browser Support
Evergreen browsers are supported, otherwise basically IE 9+.

###Features & Integrated Technologies

-   [Grunt](http://gruntjs.com/) for the build process
-   [Bower](http://bower.io/) for package management
-   [SASS](http://sass-lang.com/)
-   [Normalize.css](http://necolas.github.io/normalize.css/)
-   [Foundation](http://foundation.zurb.com/docs/components/grid.html) - the entire Foundation framework is available but only the grid is used by default.
-   JavaScript
	-   [jQuery](http://jquery.com/)
	-   [Modernizr](http://modernizr.com/)

###Notes

- Sourcemaps with SASS map back to the original styles directory, so if your web root is `dist` sourcemaps won't work properly. This shouldn't be a problem for development.