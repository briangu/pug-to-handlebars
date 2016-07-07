'use strict';

var test = require('tape');
var toHandlebars = require('../');
var fs = require('fs');
var pug = require('pug');
var handlebars = require('handlebars');
var path = require('path');
var beautify = require('js-beautify').html;

fs.readdirSync(__dirname + '/templates')
  .filter(function (filename) {
    return path.extname(filename) === '.pug';
  })
  .map(function (filename) {
    return path.basename(filename, '.pug');
  })
  .forEach(function (name) {
    test(name, function (t) {
      var locals = getLocals(name);
      var expected = getExpected(name, locals);
      t.equal(
        beautify(runInHandlebars(name, locals), {indent_size: 2}),
        beautify(expected, { indent_size: 2 })
      );
      t.end();
    });
  });

function getExpected (name, locals) {
  var expectedFile = __dirname + '/expected/' + name + '.hbs';
  return fs.existsSync(expectedFile)
    ? fs.readFileSync(expectedFile, 'utf8').trim() : runInPug(name, locals);
}

function getLocals (name) {
  try {
    return require('./locals/' + name + '.json');
  } catch (e) {}
  return {};
}

function runInHandlebars (name, locals) {
  var input = fs.readFileSync(__dirname + '/templates/' + name + '.pug', 'utf8');
  return handlebars.compile(toHandlebars(input))(locals);
}

function runInPug (name, locals) {
  locals.doctype = 'html';
  return pug.renderFile(__dirname + '/templates/' + name + '.pug', locals);
}
