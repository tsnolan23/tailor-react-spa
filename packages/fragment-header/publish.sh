#!/bin/bash
rm  -rf release
mkdir release
mkdir release/public
cp -R public release
cp package.json release/package.json
cp fragment.js release/fragment.js
cp Dockerfile release/Dockerfile
sed -i '' -e 's/8081/49160/g' release/fragment.js
sed -i '' -e 's/localhost/fragment-header.bar/g' release/fragment.js
