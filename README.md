#Installation & Usage

Before starting, be sure to check you have all the dependencies installed (listed below).

1. Open config directory

		cd src/config

2. Install vendor libraries

		bower install

3. Install Grunt dependencies

		npm install

4. Run Grunt

		grunt

5. Watch for file changes with Grunt

	Changes to working SCSS and JS files: 

		grunt watch-all

	Changes to working JS files:

		grunt watch-scripts

	Changes to SCSS files:

		grunt watch-styles


####Notes
If you add another vendor library you need to run <code>grunt</code> again.

To commit the compiled state to git, delete the `.gitignore` file in the root directory but keep `src/.gitignore`.

*****

#Adding Working JS files

Edit `src/config/Gruntconfig.json`, add your scripts to `workingFiles`, they are compiled in this same order.

*****

#Adding New Vendor Libraries/Packages

1. Add the name and version to `scr/config/bower.json` and run <code>bower install</code>. 
2. Update `src/config/Gruntconfig.json` to include the new library, add it to <code>vendorFiles</code>
3. Re-compile with <code>grunt</code>

If there is no [bower component](http://sindresorhus.com/bower-components/), add the files manually to `src/vendor` and update the `.gitignore` file so they are tracked. Then follow steps 2 and 3.

If you don't want the library to be compiled just add the files directly to `build/scripts/vendor/` or `builds/styles/vendor/`.

*****

#Customise your project
Update `src/config/package.json` with your project details. Only the edit `devDependencies` if you are also updating the build configuration in `src/config/Gruntfile.js`.

*****

#Dependencies

* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Sass](http://sass-lang.com/)
* [Compass](http://compass-style.org/)

*****

#Resources
* [Browse Bower components](http://sindresorhus.com/bower-components/)
* [Using strict mode in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)
* [Source Maps in JavaScript](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)