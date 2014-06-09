## [Launch](https://github.com/isaacwebfix/launch/)

Launch is a simple front-end boilerplate.

It includes a bunch of popular front-end technologies such as jQuery, Backbone.js, Underscore.js, Modernizr and Normalize.css - all tied together with a Grunt build.
If Launch doesn't suit you, checkout [Yeoman](http://yeoman.io/).

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

#####Notes
If you add another vendor library you'll need to run `grunt`.

###Add Working JS files

Open `config.json` and add your scripts to `workingFiles`; they are compiled in the same order.

###Add New Vendor Libraries/Packages

1. Add the name and version to `bower.json` and run `bower install`.
2. Update `config.json` to include the new library, add it to `vendorFiles`
3. Re-compile with `grunt`

If there is no [bower component](http://bower.io/search/), copy the files manually to `vendor` and update the `.gitignore` file so they are tracked. Then follow steps 2 and 3.

###Customise your project
Update `package.json` with your project details. Only the edit `devDependencies` if you are also updating the build configuration in `src/Gruntfile.js`.

###Dependencies

* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Sass](http://sass-lang.com/)

###Features & Integrated Technologies

-   A [Grunt](http://gruntjs.com/) build process
-   [Bower](http://bower.io/)
-   JavaScript
	-   [Backbone.js](http://backbonejs.org/)
	-   [Underscore.js](http://underscorejs.org/)
	-   [jQuery](http://jquery.com/)
	-   [Modernizr](http://modernizr.com/)
-   [JavaScript sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
-   [SASS](http://sass-lang.com/) (with sourcemaps)
-   [Normalize.css](http://necolas.github.io/normalize.css/)
-   A configurable base grid
-   A methodology for for writing styles, with some examples
-   HTML style guide markup