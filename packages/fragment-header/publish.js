const shell = require('shelljs');

shell.rm('-rf', 'release');
shell.mkdir('release')
shell.mkdir('release/public')
shell.cp('-R', 'public', 'release');
shell.cp('package.json','release/package.json');
shell.cp('fragment.js','release/fragment.js');
shell.cp('DockerFile','release/Dockerfile');
shell.sed('-i', '8081', '49160', "release/fragment.js");
shell.sed('-i', 'http://localhost', 'http://fragment-header.bar', "release/fragment.js");