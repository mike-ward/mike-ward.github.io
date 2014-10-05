/* global require, process */
/*jshint -W097 */
'use strict';

var fs = require('fs');

function getImage() {
  var imageFile = process.argv[2];
  if (!fs.existsSync(imageFile)) { throw imageFile +  ' not found'; }
  return imageFile;
}

function getLatestPost() {
  var files = fs.readdirSync('../_posts');
  return files
    .filter(function (f) { return f.slice(-3) === '.md'; })
    .sort()
    .reverse()[0];
}

function createPostFolder(name) {
  var path = '../cdn/images/blog/' + name.slice(0, -3) + '/';
  try {
    fs.mkdirSync(path);
  }
  catch (e) {
    if (e.code !== 'EEXIST') { throw e; }
  }
  return path;
}

function copyAssetToPostFolder(folder, asset) {
  var path = require('path');
  var link = folder + path.basename(asset);
  fs.createReadStream(asset).pipe(fs.createWriteStream(link));
  return link;
}

function markdownLink(file, link) {
  var md = '\n![image](' + link.slice(2) + ')';
  console.log(md);
}

var image = getImage();
var filename = getLatestPost();
var folder = createPostFolder(filename);
var link = copyAssetToPostFolder(folder, image);
markdownLink(filename, link);
