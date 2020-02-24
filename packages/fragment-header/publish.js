const shell = require('shelljs');

shell.rm('-rf', 'release');
shell.cp('-R', 'public/', 'release');
shell.cp('package.json','release/package.json');
shell.cp('fragment.js','release/fragment.js');
shell.cd("release")
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', '_HOST_', 'http://fragment-header.foo', file);
  shell.sed('-i', '_PORT_', '8081', file);
});
shell.cd("..")