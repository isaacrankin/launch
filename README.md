
#Installation

While in the directory "/dev":

Install JS dependencies:
bower install

Install Grunt dependencies:
npm install

Features:

Single watch command for Grunt
Different compile commands for Grunt
Bower to install dependencies
Compile and minify vendor JS into a single file
Compile
Include source maps for all JS

Problems:

How to ensure that each the versions of the vendor JS libraries stay consistent?
e.g. If a user re-runs bower  - switch to static versions But how to keep up to date with latest versions of libraries?
