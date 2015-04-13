/**
 * Grunt configuration
 */

'use strict';

var pkg = require('../package');

module.exports = {
    "workingPath": "",
    "outputPath": "dist/",
    "tempPath": "tmp/",
    "vendorPath": "vendor/",
    "images": {
        "src": "images",
        "dest": "dist/images/"
    },
    "vendorFiles": {
        "styles": [
            "vendor/normalize-css/normalize.css"
        ],
        "scripts": []
    },
    "workingFiles": {
        "scripts": [
            "scripts/plugins.js",
            "scripts/framework/*",
            "scripts/app.js"
        ]
    }
};