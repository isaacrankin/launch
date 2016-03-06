'use strict';

import ExampleModule from 'lib/example-module.js';

$(function() {
    let example = new ExampleModule();
    console.log(example.hello('ES6 Modules!'));
});
