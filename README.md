# redux-variants

[![Circle CI](https://circleci.com/gh/home-buddy/hz-api-client.svg?style=flat)](https://circleci.com/gh/homezen/redux-variants)
[![codecov](https://codecov.io/gh/homezen/redux-variants/branch/master/graph/badge.svg)](https://codecov.io/gh/homezen/redux-variants)

Universal JavaScript variants system for Redux (plus React helpers)

## Supported platform

*   node v4.X and 6.X
*   npm v3.X

## Getting Started

### Running tests

To run the full suite, run

```bash
npm tst
```

### Other commands

#### `npm run build`

Builds the production assets suitable for release

#### `npm run deploy`

Git tags release and publishes to npm

#### `npm start`

Runs the test watcher

## CI/CD

### Releases

Every commit to master defaults to a patch bump.  If it needs to be a minor or major, ENSURE YOU DO THE FOLLOWING:

If you would like to create a release, add the following to the merge commit message when you merge a PR:

```bash
release v+<bump type>
```

Where `<bump type>` is one of:

*   major
*   minor
*   patch (default)

This will:

1.  Bump version in package.json and commit back to master
1.  Git tag that newly created commit with the new version
1.  Publish to npm
