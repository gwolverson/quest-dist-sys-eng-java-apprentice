var docPublisher = require('doc-publisher');
var pkginfo = require('pkginfo')(module, 'dependencies');

// Pull the dependency keys from the package.json file - filter only on skills,
// ignoring any other dependencies
const dependencies = Object.keys(module.exports.dependencies);
let dependencyKeys = dependencies.filter((key) => {
  return key.startsWith('skill');
});

docPublisher(dependencyKeys);
