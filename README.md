# Launch

Launch is a basic front-end boilerplate that is designed for creating static websites, or for easy integration with a CMS website.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com/)

## Setup

1. `npm install`
2. `gulp`
3. `gulp serve`

If you don't want to use [Browsersync](https://www.browsersync.io/) just run `gulp` then `gulp watch` and use your own server.

## Customisation

Replace the Launch example meta-data with your own:

- Update the example `./src/manifest.json` file with your application details, read about it [here](https://developer.mozilla.org/en-US/docs/Web/Manifest).

- Update the `./package.json` file with your application details.

## Tests

`npm test` to run the tests.

A useful way to automatically run the tests is with a pre-commit hook. Just copy `pre-commit` to `.git/hooks/` and apply the correct permissions with `chmod +x .git/hooks/post-commit`

[Mocha](https://mochajs.org/) is used for unit testing. Because we are working with ES2015 modules, we compile to CommonJS modules first, using Babel. 

## Build Tasks

- `gulp` builds the project to the `dist` directory.
- `gulp watch` listens for file changes and re-builds the project.
- `gulp serve` builds the project, starts a Browsersync server and watches for file changes (hot reloading included).
- `gulp compress-images` image compression.
- `gulp test` runs the unit tests.

## What's in the box

-   [Babel](http://babeljs.io/) - so we can use ES2015.
-   [Browsersync](https://www.browsersync.io/)
-   [Foundation](http://foundation.zurb.com/docs/components/grid.html) - the entire Foundation framework is available but only the grid and media queries are used by default.
-   [Gulp](http://gulpjs.com/)
-   [SASS](http://sass-lang.com/)
