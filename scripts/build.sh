#!/usr/bin/env bash

set -e # Stop on first error

### Cleanup
rm -rf dist/cmd.zip

### Build
./node_modules/.bin/tsc
cp ./src/manifest.json ./dist/js
cp -r icons ./dist/js

### Zip as web extension for Firefox
(cd dist/js && zip -r ../cmd.zip . -x tsconfig.tsbuildinfo)
