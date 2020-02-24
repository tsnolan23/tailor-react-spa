const shell = require('shelljs');

shell.rm('-rf', 'release');
shell.mkdir('release')
shell.mkdir('release/public')
shell.cp('-R', 'public', 'release');
shell.cp('package.json','release/package.json');
shell.cp('fragment.js','release/fragment.js');
shell.cp('DockerFile','release/Dockerfile');
shell.cd("release")
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', '_HOST_', 'http://fragment-header.bar', file);
  shell.sed('-i', '_PORT_', '49160', file);
});
shell.cd("..")