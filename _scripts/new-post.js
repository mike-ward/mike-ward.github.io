/* global require, process */
/*jshint -W097 */
'use strict';

var fs = require('fs');
var slug = require('slug');
var moment = require('moment');

function getTitle(input) {
  var title = input.toString().trim();
  if (title.length < 5) {
    console.error('error: title less than 5 characters');
    process.exit(1);
  }
  return title;
}

function buildFileName(title) {
  var name = moment().format('YYYY-MM-DD-') + slug(title) + '.md';
  return name.toLowerCase();
}

function buildFrontMatter(title) {
  var fm = [];
  fm.push('---');
  fm.push('layout: post');
  fm.push('title:  "' + title + '"');
  fm.push('---');
  return fm.join('\n');
}

function writeFile(file, frontMatter) {
  var path = '../_posts/' + file;
  var err = fs.writeFileSync(path, frontMatter);
  if (err) { throw err; }
  console.log(path + ' created');
  return path;
}

function launchEditor(path) {
  require('child_process').exec('atom ' + path, function () {
    process.exit(0);
  });
}

var stdin = process.openStdin();
console.log('Enter post title');

stdin.addListener("data", function(d) {
  var title = getTitle(d);
  var file = buildFileName(title);
  var frontMatter = buildFrontMatter(title);
  var path = writeFile(file, frontMatter);
  launchEditor(path);
});
