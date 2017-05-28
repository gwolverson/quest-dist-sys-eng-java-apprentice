var f = require('fs');
var fs = require('fs-extra');
var gfm = require('get-module-file');
var pkginfo = require('pkginfo')(module, 'dependencies');

// Copy the project README to ./docs/index.md - this is your jumping-off point
fs.copySync("README.md", './docs/index.md');

// Copy dependency READMEs into dependency-named sub-dirs as index.md files
// and as we go, remember the descriptions from each project, to be inserted
// into the main page (./docs/index.md)
var dependencyIds = Object.keys(module.exports.dependencies);
var mainLinkSection = "";

for (i = 0; i < dependencyIds.length; i++) {
  var currentDependency = dependencyIds[i];
  var readmeFile = gfm.sync(__dirname, currentDependency, 'README.md');

  if (readmeFile != false) {
    fs.copySync(readmeFile, './docs/' + currentDependency + '/index.md');
  }

  // Get the description of the current dependency it's package.json (for use in the main page link text)
  var dependencyPackageFileLoc = gfm.sync(__dirname, currentDependency, 'package.json');
  var description = null;

  f.readFile(dependencyPackageFileLoc, 'utf-8', function read(err, data) {
    if (err) {
      return console.log(err);
    }

    var matches = data.match(/"description": "[a-zA-Z :\/()-]*"/);
    description = JSON.parse('{' + matches[0] + '}')["description"];

    if (description == null) {
      description = currentDependency;
    }

    mainLinkSection += "  * [" + description + "](./docs/" + currentDependency + "/index.md) \n"
  });

}

// Add links to dependency pages into main page
fs.readFile("./docs/index.md", 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace("[MODULE-LINKS WILL BE AUTO-INSERTED HERE]", mainLinkSection);

  fs.writeFile("./docs/index.md", result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
