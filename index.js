var npm = require('npm');
var fs = require('fs');
var pkgJson = require(process.cwd() + '/package.json');


function updateDeps(dependencyObject, data) {

    if (!Object.keys(dependencyObject).length) return;

    return Object.keys(dependencyObject).reduce(function (prev, key) {

        if (dependencyObject[key] === '*') {
            // lookup the correct version number
            prev[key] = data.dependencies[key].version;
        } else {
            //otherwise keep it as is
            prev[key] = dependencyObject[key];
        }

        return prev;
    }, {});

}

npm.load(function (err, npm) {
    npm.commands.ls([], true, function (err, data, lite) {

        pkgJson.devDependencies = updateDeps(pkgJson.devDependencies, data);
        pkgJson.dependencies = updateDeps(pkgJson.dependencies, data);

        fs.writeFile(process.cwd() + '/package.json', JSON.stringify(pkgJson, null, 4));

    });
});
