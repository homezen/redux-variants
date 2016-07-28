#!/bin/bash

set -ex

git config --global user.email "zenbot@myhomezen.com"
git config --global user.name "ZenBot via CircleCI"
git config --global push.default simple

CI_MSG_PREFIX=":arrow_up: CircleCI: Releasing"
LAST_COMMIT_MSG="$(git log -1 --pretty=%B)"
SEMVER_BUMP_TYPE="$(echo ${LAST_COMMIT_MSG} | sed -n 's/^.*[rR]elease v+\([a-z]\+\).*$/\1/p')"

if echo ${LAST_COMMIT_MSG} | grep "${CI_MSG_PREFIX}"; then
    echo "Last commit was by CI.  Not releasing."
    exit 0
fi

if [ -n "${SEMVER_BUMP_TYPE}" ]; then
    npm version ${SEMVER_BUMP_TYPE} -m "${CI_MSG_PREFIX} %s"
else
    npm version patch -m "${CI_MSG_PREFIX} %s"
fi

npm publish

git push
git push --tags
