#! /usr/bin/env node

var npm = require('npm');
var fs = require('fs');
var pkgJson = require(process.cwd() + '/package.json');

function updateDeps(dependencyObject, data) {

    if (typeof dependencyObject !== 'object' || !Object.keys(dependencyObject).length) return;

    return Object.keys(dependencyObject).reduce(function (prev, key) {
        if (data.dependencies[key] != undefined) {
            if (dependencyObject[key] === "*") {
                // lookup the correct version number
                prev[key] = data.dependencies[key].version;
            } else {
                //otherwise keep it as is
                prev[key] = dependencyObject[key];
            }
            return prev;
        } else {
            throw new Error("Getting an undefined error on a value for your dependencies.\nCheck two things:\n1.) Validate you have run npm install at least once inside your repository's directory.\n2.) Validate you have a dependencies and devDependencies and that they both have at least 1 key and value inside them.");
        }
        
    }, {});

}

npm.load(function (err, npm) {
    npm.commands.ls([], true, function (err, data, lite) {

        pkgJson.devDependencies = updateDeps(pkgJson.devDependencies, data);
        pkgJson.dependencies = updateDeps(pkgJson.dependencies, data);

        fs.writeFile(process.cwd() + '/package.json', JSON.stringify(pkgJson, null, 4));

    });
});
