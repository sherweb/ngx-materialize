<div class="readme-github-logo">
  <p align="center">
    <img src="https://github.com/sherweb/ng2-materialize/blob/master/demo-app/src/assets/ng2-materialize-circle.png">
    <h1 align="center">ng2-materialize</h1>
    <div align="center">
      <a href="https://circleci.com/gh/sherweb/ng2-materialize">
        <img alt="CircleCI Status" src="https://circleci.com/gh/sherweb/ng2-materialize.svg?style=shield&circle-token=4f457a3c93c34ad9cdf21cbe53605dad94f21955">
      </a>
      <a href="https://www.npmjs.com/package/ng2-materialize">
        <img alt="NPM Version" src="https://img.shields.io/npm/v/ng2-materialize.svg?style=flat">
      </a>
      <a href="https://opensource.org/licenses/Apache-2.0">
        <img alt="License" src="https://img.shields.io/npm/l/ng2-materialize.svg">
      </a>
    </div>
  </p>
  <hr>
</div>

<div class="readme-summary">
  <p align="center">
    This library is an <a href="https://angular.io/">Angular 2</a> wrap around <a href="https://angular.io/">Materialize</a> library, a responsive CSS/JS framework that implements Material Design specifications from Google.
  </p>
  <p align="center">
    The purpose of this library is to simplify the usage within the Angular framework.
  </p>
</div>

## Why ng2-materialize?

We are aware that alternatives exposing Material Design components already exist. But, in our case, we want to rely on a stable css framework that does not depend on a specific js framework.

We already know the possibilities Materialize offers. What is left to do is to wrap components that we want to use in Angular component.

If you want to use a component that is not yet implemented, simply wrap the existing Materialize components that already meets the Material Design specifications. No need to be an HTML/CSS expert, only to know the Angular 2 components. Or if you are in a hurry, you can use it directly in HTML rather than in Angular component.

## Installation

The following commands will add Ng2-Materialize library to your `package.json` file along with it dependencies: Materialize CSS, jQuery and Mdi (Mdi icons library is optional as your are free to use the icon library of your choice).

```
npm install --save ng2-materialize
npm install --save mdi    #optional
```

Don't forget to include jQuery, Materialize, and Mdi in your application.

If you are using [Angular-CLI](https://github.com/angular/angular-cli) you can follow the example below :

#### angular-cli.json

```diff
"styles": [
  "styles.scss",
+ "../node_modules/materialize-css/bin/materialize.css",
+ "../node_modules/mdi/css/materialdesignicons.css"
],
"scripts": [
+ "../node_modules/jquery/dist/jquery.js",
+ "../node_modules/materialize-css/bin/materialize.js"
],
```

See also [Angular CLI 3rd Party Library Installation](https://github.com/angular/angular-cli#3rd-party-library-installation) and [Using MaterializeCSS with your Angular 2 Angular CLI App](https://medium.com/@ladyleet/using-materializecss-with-your-angular-2-angular-cli-app-2eb64b05a1d2#.8p3uba85g).

## Usage

You must import `MaterializeModule` inside your module to be able to use Materialize components.

```diff
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
+ import { MaterializeModule } from 'ng2-materialize';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
+    MaterializeModule.forRoot(),
  ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }
```

## Available components

* Badge
* Button
* Card
* Checkbox
* Collapsible
* Dropdown
* Icon
* Input
* Navbar
* Parallax
* Progress
* Radio-Button
* Select
* Sidenav
* Spinner
* Textarea

## Demo application

A demo application is available, please refer to the `./demo-app` folder and its [README](./demo-app/README.md).

## Road map

We (at SherWeb) are currently wrapping the components as we need them, and unfortunately, we cannot provide a specific road map.

If some components are missing, feel free to contribute.

## Contribute

Contributions are always welcome.

Make sure that :
- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

And you are ready to go!

## Credits

Thanks to [Ali Mohammadi](https://github.com/ayalma) for donating the npm package name.