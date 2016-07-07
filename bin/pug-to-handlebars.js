#!/usr/bin/env node

var program = require('commander');
var toHandlebars = require('../');
var fs = require('fs');
var path = require('path');
var pkg = require(path.join(__dirname, '../package.json'));
var paths = [];
var outputDir;

program
	.version(pkg.version)
    .usage('[path...]')
    .arguments('[path...]')
	.option('-o, --out <destination>', 'destination folder (defaults to current directory)')
    .action(function (path) {
       paths = path;
    })
	.parse(process.argv);

if (paths.length === 0) {
    paths.push(process.cwd());
}

if (program.out) {
    try {
        var stats = fs.lstatSync(program.out);
        if (stats.isDirectory()) {
            outputDir = program.out;
        }
    } catch (e) {
    }
}

var isPugFile = function (fileName) {
    return fileName.match(/(.*)\.pug$/i) !== null;
};

var convertFile = function (pugFilename) {
    var handlebarsName = pugFilename.slice(0, -3) + 'hbs';
    var file = fs.readFileSync(pugFilename, 'utf8');
    var handlebars = toHandlebars(file, { pretty: true, filename: pugFilename });

    if (outputDir) {
        fs.writeFileSync(path.join(outputDir, path.basename(handlebarsName)), handlebars);
    } else {
        fs.writeFileSync(handlebarsName, handlebars);
    }
};

paths.forEach(function (pathName) {
    try {
        var stats = fs.lstatSync(pathName);
        if (stats.isDirectory()) {
            var dirContent = fs.readdirSync(pathName);
            dirContent.forEach(function (file) {
                if (fs.lstatSync(path.join(pathName, file)).isFile() && isPugFile(file)) {
                    convertFile(path.join(pathName, file));
                }
            });
        } else if (stats.isFile()) {
            if (isPugFile(pathName)) {
                convertFile(pathName);
            }
        }
    } catch (e) {
    }
});
