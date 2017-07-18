## Getting started

> We encourage the use of [Yarn](https://yarnpkg.com/en/) althought all commands can be used with `npm`

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
