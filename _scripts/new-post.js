var fs = require('fs');
var sys = require('sys');
var slug = require('slug');
var moment = require('moment')

function postFile (title) {
  var name = moment().format('YYYY-MM-DD-') + slug(title) + '.md';
  return name;
}

var stdin = process.openStdin();
console.log('Enter post title');
stdin.addListener("data", function(d) {
  var title = d.toString().trim();
  if (title.length < 5) {
    console.error('error: title less than 5 characters');
    process.exit();
  }
  var file = postFile(title);
  console.log('Post file:  ' + file);

  var content = [];
  content.push('---');
  content.push('layout: post');
  content.push('title:  "' + title + '"');
  content.push('---')

  var frontMatter = content.join('\n');
  console.log(frontMatter);

  var err = fs.writeFileSync('../_posts/' + file, frontMatter);
  if (err) throw err;
  console.log(file + ' created');
  process.exit();
});
