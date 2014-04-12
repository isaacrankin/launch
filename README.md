## [Launch](https://github.com/isaacwebfix/launch/)

Launch is a simple front-end boilerplate.

It includes a bunch of popular front-end technologies such as jQuery, Backbone.js, Underscore.js, Modernizr and Normalize.css - all tied together with a Grunt build.
If Launch doesn't suit you, checkout [Yeoman](http://yeoman.io/).

###Installation & Usage

Before starting, check you have all the dependencies installed (listed below).

1. Open the src directory

		cd src

2. Install vendor libraries

		bower install

3. Install Grunt dependencies

		npm install

4. Run Grunt

		grunt

5. Watch for file changes with Grunt using one of following tasks

	Changes to working SCSS and JS files:

		grunt watch-all

	Changes to working JS files:

		grunt watch-scripts

	Changes to SCSS files:

		grunt watch-styles


#####Notes
If you add another vendor library you'll need to run `grunt`.

To commit the compiled state, delete the `.gitignore` file in the root directory but keep `src/.gitignore`.


###Add Working JS files

Open `src/config.json` and add your scripts to `workingFiles`; they are compiled in the same order.

###Add New Vendor Libraries/Packages

1. Add the name and version to `src/bower.json` and run `bower install`.
2. Update `src/config.json` to include the new library, add it to `vendorFiles`
3. Re-compile with `grunt`

If there is no [bower component](http://bower.io/search/), copy the files manually to `src/vendor` and update the `.gitignore` file so they are tracked. Then follow steps 2 and 3.

If you don't want the library to be compiled just copy the files directly to `build/scripts/vendor/` or `builds/styles/vendor/`.

###Customise your project
Update `src/package.json` with your project details. Only the edit `devDependencies` if you are also updating the build configuration in `src/Gruntfile.js`.

###Dependencies

* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Sass](http://sass-lang.com/)
* [Compass](http://compass-style.org/)

###Features & Integrated Technologies

-   A [Grunt](http://gruntjs.com/) build process
-   [Bower](http://bower.io/)
-   JavaScript
	-   [Backbone.js](http://backbonejs.org/)
	-   [Underscore.js](http://underscorejs.org/)
	-   [jQuery](http://jquery.com/)
	-   [Modernizr](http://modernizr.com/)
-   [JavaScript sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
-   [SASS](http://sass-lang.com/) & Compass
-   [Normalize.css](http://necolas.github.io/normalize.css/)
-   A configurable base grid
-   A methodology for for writing styles, with some examples
-   HTML style guide markup