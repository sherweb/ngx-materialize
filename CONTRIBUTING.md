## Table of contents:
- [Code of Conduct](#code-of-conduct)
- [Reporting Bugs](#reporting-bugs)
  - [Guidelines for bug reports](#guidelines-for-bug-reports)
- [Feature requests](#feature-requests)
- [Pull requests](#pull-requests)
  - [Guidelines for pull requests](#guidelines-for-pull-requests)
- [Getting started](#getting-started)
  - [Repository](#repository)
  - [The demo application](#the-demo-application)
  - [The library](#the-library)
  - [CI](#ci)

## Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/sherweb/ngx-materialize/blob/master/CODE_OF_CONDUCT.md).

## Reporting Bugs
A bug is a demonstrable problem that is caused by the code in the repository. Good bug reports are extremely helpful! Unclear issues with little explanations will be closed.

### Guidelines for bug reports
- Check if the issue has already been reported - use the GitHub issue search to ensure the issue is not already reported.
- Check if the issue has been fixed - try to reproduce it using the latest master or development branch in the repository.
- Check if the issue is related to our library - check if the issue is reported on Materilaize [issue page](https://github.com/Dogfalo/materialize/issues) or any other libraries (Angular, Zone.Js, etc).
- Isolate the problem — provide a reduced snippet of your Typescript/HMTL code with only useful information related to the bug.

## Feature requests
We (at SherWeb) are currently wrapping the components as we need them, and unfortunately, we cannot provide a specific road map for features that are not currently implemented.

## Pull requests
Before you begin a feature, please ask first if we are working on it. If you don't, you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

### Guidelines for pull requests
- Demo page - Each component has a demo page that demonstrates how to use it and what properties are available. You can use as examples those that are already implemented in the folder `/demo/`.
- Unit tests - Make sure that new features are covered by unit/view tests as per the other component's conventions. We suggest you do view tests instead of unit tests. These are easier to refactor and maintain as they don't rely on the code implementation but on the expected behaviors ([Black box test](http://softwaretestingfundamentals.com/black-box-testing/)).
- Readme - Update the readme.md file to include the feature in the list of availabe components/directives/services.
- Code convention - Verify that your code follows the other component's structure and implementation.
- CI - CI will be executed on each pull request so make sure everything passes correctly (build/tests/lint).
- Code review - The project's developers will review your code and can possibly ask for some changes or suggestions before accepting your pull request.

## Getting started

> We encourage the use of [Yarn](https://yarnpkg.com/en/) although all commands can be used with `npm`

### Repository
Our repository has been created with 2 sections in mind...

### The demo application
_Can be found in the `demo` folder located at the root of the repository_

Serves as a "story book" to build and manually test our components. Each component has it's page with basic examples, snippets and a playground when possible.

To start the demo application, use `yarn start` from the root folder (it will move you to the `demo` folder) or run the command from the `demo` folder.

### The library
_Can be found in the `lib` folder located at the root of the repository_

The library contains the components/services/directives that will be transpiled to javascript and published on npm.

To run the tests in the library, use `yarn test` and to run the typescript linter, use `yarn lint`.

To build and transpile the library to javascript, use `yarn run build`. This command is only used to publish on npm (this uses prebuild and postbuild steps configured in `package.json`) so you won't really need that unless you want to be sure it still compiles.

### CI
Everytime a commit occurs, our continuous integration process will make sure that the code compiles in AoT, passes the tests, passes the lint rules and that it can be successfully integrated into another solution. You want to make sure those pass before committing but if ever they don't, you can always do the correction and commit on the same pull request.
