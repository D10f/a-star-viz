#!/bin/bash

# Sets the package ready for NPM: only uploads the contents of the dist/
# directory.

if [[ ! -d dist ]]; then
    printf "dist/ directory does not exist. Exiting...\n"
    exit 1
fi

cp package* README.md dist

{
    cd dist || exit
    rm ./*.LICENSE
    npm publish
}
