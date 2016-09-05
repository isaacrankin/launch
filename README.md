# Launch

Launch is a basic front-end boilerplate that is designed for creating static websites, or for easy integration with a CMS website.

## Requirements

- [Nodejs](https://nodejs.org/en/download/)

## Setup

1. `npm install`
2. `gulp`
3. `gulp serve`

If you don't want to use [Browsersync](https://www.browsersync.io/) just run `gulp` then `gulp watch` and use your own server.

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
-   [jQuery](http://jquery.com/)
-   [Normalize.css](http://necolas.github.io/normalize.css/)
-   [SASS](http://sass-lang.com/)
