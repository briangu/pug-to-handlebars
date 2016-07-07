'use strict';

var lex = require('pug-lexer');
var parse = require('pug-parser');
var beautify = require('js-beautify').html;
var walk = require('./lib/walk');

module.exports = function (input, opts) {
  var ast = parse(lex(input));
  var html = walk(opts, ast);

  return beautify(html, {
    indent_size: 2,
    indent_handlebars: true
  });
};
