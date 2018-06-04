<div class="readme-github-logo">
  <p align="center">
    <img src="https://github.com/sherweb/ngx-materialize/raw/master/demo/src/assets/ngx-materialize-circle.png">
  </p>
  <h1 align="center">ngx-materialize</h1>
  <p align="center">
    <a href="https://circleci.com/gh/sherweb/ngx-materialize">
      <img alt="CircleCI Status" src="https://circleci.com/gh/sherweb/ngx-materialize.svg?style=shield&circle-token=4f457a3c93c34ad9cdf21cbe53605dad94f21955">
    </a>
    <a href="https://ci.appveyor.com/project/sherweb/ngx-materialize">
      <img alt="AppVeyor Status" src="https://ci.appveyor.com/api/projects/status/github/sherweb/ngx-materialize?branch=master&svg=true">
    </a>
    <a href="https://www.npmjs.com/package/ngx-materialize">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/ngx-materialize.svg?style=flat">
    </a>
    <a href="https://opensource.org/licenses/Apache-2.0">
      <img alt="License" src="https://img.shields.io/npm/l/ngx-materialize.svg">
    </a>
  </p>
</div>

<div class="readme-summary">
  <p align="center">
    This library is an <a href="https://angular.io/">Angular</a> wrap around <a href="http://materializecss.com/">Materialize</a> library, a responsive CSS/JS framework that implements Material Design specifications from Google.
  </p>
  <p align="center">
    Demo and documentation : <a href="https://sherweb.github.io/ngx-materialize/">https://sherweb.github.io/ngx-materialize/</a>
  </p>
</div>

## Why ngx-materialize?

The main purpose of this library is to simplify the usage of Materialize within the Angular framework which make it more dynamic. To illustrate this, we have Playground sections in several component demo pages.

In other words, we ...

- Simplify components usage
- Initialize components automatically
- Handle Angular "quirks" with Materialize library
- Offer component injection when possible
- Provide a MediaService that allow customization according to view port size
- Add support for ReactiveForm with validation


### Table of contents
- [Installation](#installation)
- [Icons](#icons)
- [Animation](#animation)
- [Usage](#usage)
- [Available features](#available-features)
- [Demo application](#demo-application)
- [Contribute](#contribute)
- [Credits](#credits)

## Installation

The following commands will add ngx-materialize library to your `package.json` file along with its dependencies: Materialize CSS and jQuery.

```
npm install --save ngx-materialize
```

Don't forget to include Materialize and jQuery in your application.

If you are using [Angular-CLI](https://github.com/angular/angular-cli) you can follow the example below :

#### angular.json

```diff
"styles": [
  "src/styles.scss",
+ "node_modules/materialize-css/dist/css/materialize.min.css"
],
"scripts": [
+ "node_modules/jquery/dist/jquery.min.js",
+ "node_modules/materialize-css/dist/js/materialize.min.js"
],
```

#### tsconfig

```diff
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "module": "es2015",
    "types": [
+      "jquery",
+      "materialize-css"
    ]
  },
  "exclude": [
    "src/test.ts",
    "**/*.spec.ts"
  ]
}
```

See also [Angular CLI 3rd Party Library Installation](https://github.com/angular/angular-cli/wiki/overview#global-library-installation) and [Using MaterializeCSS with your Angular 2 Angular CLI App](https://medium.com/@ladyleet/using-materializecss-with-your-angular-2-angular-cli-app-2eb64b05a1d2#.8p3uba85g).

## Icons

Ngx-materialize offers two "out-of-the-box" options for icons although you are free to use the library of your choice.

### Material Design Icons
To use [Material Design Icons](https://materialdesignicons.com/) (community project based on Google Material Icons with lots of added icons), which is used with `mz-icon-mdi` directive, you will need to add the library with the following command:

```
npm install --save @mdi/font
```

Don't forget to include Mdi library to your application.

If you are using [Angular-CLI](https://github.com/angular/angular-cli) you can follow the example below :

#### angular.json

```diff
"styles": [
  "src/styles.scss",
  "node_modules/materialize-css/dist/css/materialize.min.css",
+ "node_modules/@mdi/font/css/materialdesignicons.min.css"
],
```

### Material Icons
To use [Material Icons](https://material.io/icons/) (official Google Material Icons library), which is used with `mz-icon` directive, you will need to add the following into the `<head>` tag of your `index.html` file:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Animation
Some components are using advance animation transition. You need to install `@angular/animations` and include `BrowserAnimationsModule` if you want those animation to work.

```
npm install --save @angular/animations
```
```diff
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
+ import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';

@NgModule({
  imports: [
+    BrowserAnimationsModule,
  ],
})
export class AppModule { }
```

If you don't want to install a new dependency in your application, you can include `NoopAnimationsModule`.
```diff
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
+ import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';

@NgModule({
  imports: [
+    NoopAnimationsModule,
  ],
})
export class AppModule { }
```

## Usage

You must import component module you want to use inside your module to be able to use Materialize components.

```diff
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
+ import { MzButtonModule, MzInputModule } from 'ngx-materialize';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
+   MzButtonModule,
+   MzInputModule,
  ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }
```


### MaterializeModule deprecated
We will continue to maintain this module for a period of time to allow you to migrate your existing components to the new way.
We recommend to use the new component modules when you are building new component/application.

If you still want to import only one module, you can create a separate `NgModule` in your application that imports all the `ngx-materialize` components. You will be able to include this module anywhere you like to use the components.

```
import { MzInputModule, MzValidationModule } from 'ngx-materialize';

@NgModule({
  imports: [
    MzInputModule,
    MzValidationModule,
  ],
  exports: [
    MzInputModule,
    MzValidationModule,
  ],
})
export class CustomMaterializeModule { }
```

## Available features

 Page listed in [Native CCS Class](./native-css-class) will not be wrapped.

### Components

* Badge
* Button
* Card
* Checkbox
* Chip
* Collapsible
* Collection
* Datepicker
* Dropdown
* Feature discovery
* Form validation
* Icon
* Input
* Modal
* Navbar
* Pagination
* Parallax
* Progress
* Radio-Button
* Select
* Sidenav
* Spinner
* Switch
* Tab
* Textarea
* Timepicker
* Toast
* Tooltip

### Services

* Media

## Demo application

A demo application is available at [https://sherweb.github.io/ngx-materialize/](https://sherweb.github.io/ngx-materialize/), or refer to the `./demo` folder and its [README](./demo/README.md).

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
