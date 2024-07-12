#!/bin/bash

# Sets the package ready for NPM: only uploads the contents of the dist/
# directory.

PROJECT_DIR="$(dirname "$(readlink -f "${0##*/}")")"

if [[ ! -d ${PROJECT_DIR}/dist ]]; then
    printf "dist/ directory does not exist. Exiting...\n"
    exit 1
fi


cd "${PROJECT_DIR}" || exit

cp package* README.md dist

cd dist || exit
rm ./*LICENSE*
npm publish
