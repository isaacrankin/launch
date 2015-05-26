/**
 * Grunt configuration
 */

'use strict';

var pkg = require('../package');

module.exports = {
    "workingPath": "",
    "outputPath": "dist/",
    "tempPath": "tmp/",
    "vendorPath": "node_modules/",
    "images": {
        "src": "images",
        "dest": "dist/images/"
    },
    "vendorFiles": {
        "styles": [
            "node_modules/normalize-css/normalize.css"
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