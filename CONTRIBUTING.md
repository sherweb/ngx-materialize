## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting started

>We encourage the use of [Yarn](https://yarnpkg.com/en/) althought all commands can be used with `npm`

### Repository
Our repository has been created with 2 sections in mind...

### The demo application
_Can be found in `demo-app` folder located at the root of the repository_

Serve as a "story book" to build and manually test our components. Each component has its page with basic examples, snippets and a playground when possible.

To serve the demo application use `yarn start` from the root folder (it will move you to the `demo-app` folder) or run the command from the `demo-app` folder.

### The library
_Can be found in the `src` folder located at the root of the repository_

The library contains the components/services/directives that will be transpiled to javascript and published on npm.

To run the tests in the library run `yarn test` and to run the typescript linter use `yarn lint`.

To build and transpile the library to javascript use `yarn run build`. This command is only used to publish on npm (this used prebuild and postbuild steps configured in `package.json`) so you won't really need that unless you want to be sure it still compile.

### CI
Everytime a commit occurs, our continuous integration process will make sure that the code compile in AoT, passes the tests, passes the lint rules and that it can be successfully integrated into another solution. So you might wan't to make sure those passes before to commit but if it doesn't you can always do the correction and commit on the same pull request.

## Reporting Bugs
A bug is a demonstrable problem that is caused by the code in the repository. Good bug reports are extremely helpful! Unclear issues with little explanations will be closed.

### Guidelines for bug reports:

- Use the GitHub issue search - check if the issue has already been reported.
- Check if the issue has been fixed - try to reproduce it using the latest master or development branch in the repository.
- Check if the issue is related our library - check if the issue is reported on Materilaize [issue page](https://github.com/Dogfalo/materialize/issues) or any other libraries (Angular, Zone.Js, etc).
- Isolate the problem — provide a reduced snippet of your Typescript/HMTL code with only useful information related to the bug.

## Feature requests
We (at SherWeb) are currently wrapping the components as we need them, and unfortunately, we cannot provide a specific road map for feature that are not currently implemented. 

## Pull request
Before you begin a feature please ask first if we are working on it. You risk spending a lot of time working on something that the project's developers might not want to merge into the project.

### Guidelines for pull request:
- Create demo page - Each component have a demo page that demonstrate how to use it and what properties are availables. You can take example on those that are already implemented in folder `/demo-app/`. 
- Unit tests - Make sure all your test in covered by adding unit/view tests following the other component convention. We suggest you to do view test instead of unit test. Those are easier to refactor and maintain as they do not relate on the code implementation but either on the expected behaviors ([Black box test](http://softwaretestingfundamentals.com/black-box-testing/)).
- Readme - Update the readme.md file to include the feature to the list of availabe components/directives/services.
- Code - Verify your code follow the other component structure and implementation.
