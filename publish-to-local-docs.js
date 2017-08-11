var docPublisher = require('doc-publisher');
var pkginfo = require('pkginfo')(module, 'dependencies');

// Pull the skill dependency keys from the package.json file 
const dependencyKeys = Object.keys(module.exports.dependencies);
docPublisher(dependencyKeys);
