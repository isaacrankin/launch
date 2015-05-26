## [Launch](https://github.com/isaacwebfix/launch)

Launch is a front-end boilerplate

It extends [HTML5 boilerplate](https://html5boilerplate.com/) and includes popular front-end technologies such as Babel, SASS, jQuery, Foundation, Modernizr and Normalize.css, tied together with a Grunt build.

###Installation & Usage

1. Install build dependencies

		npm install

2. Build the project

		grunt

4. Watch for file changes with Grunt.

		grunt watch

Use `grunt clean` to delete the compiled directory and temp folder if needed.

###Add Vendor Packages

1. Use [npm to install](https://docs.npmjs.com/cli/install) the package, `npm install package-name --save`
2. Update `grunt/config.json` to include the new library, add it to `vendorFiles`
3. Re-compile with `grunt`

###Dependencies

* [Node.js](http://nodejs.org/)
* [Grunt](http://gruntjs.com/)

###Browser Support
Evergreen browsers are supported, otherwise basically IE 9+.

###Integrated Technologies

-   [Babel](http://babeljs.io/)
-   [Grunt](http://gruntjs.com/)
-   [SASS](http://sass-lang.com/)
-   [Normalize.css](http://necolas.github.io/normalize.css/)
-   [Foundation](http://foundation.zurb.com/docs/components/grid.html) - the entire Foundation framework is available but only the grid and media queries are used by default.
-   [jQuery](http://jquery.com/)
-   [Modernizr](http://modernizr.com/)

###Notes

- Sourcemaps with SASS map back to the original styles directory, so if your web root is `dist` sourcemaps won't work properly.