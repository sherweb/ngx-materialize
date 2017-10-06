<div class="readme-github-logo">
  <p align="center">
    <img src="https://github.com/sherweb/ng2-materialize/raw/master/demo-app/src/assets/ng2-materialize-circle.png">
  </p>
  <h1 align="center">ng2-materialize</h1>
  <div align="center">
    <a href="https://circleci.com/gh/sherweb/ng2-materialize">
      <img alt="CircleCI Status" src="https://circleci.com/gh/sherweb/ng2-materialize.svg?style=shield&circle-token=4f457a3c93c34ad9cdf21cbe53605dad94f21955">
    </a>
    <a href="https://ci.appveyor.com/project/sherweb/ng2-materialize">
      <img alt="AppVeyor Status" src="https://ci.appveyor.com/api/projects/status/github/sherweb/ng2-materialize?branch=master&svg=true">
    </a>
    <a href="https://www.npmjs.com/package/ng2-materialize">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/ng2-materialize.svg?style=flat">
    </a>
    <a href="https://opensource.org/licenses/Apache-2.0">
      <img alt="License" src="https://img.shields.io/npm/l/ng2-materialize.svg">
    </a>
  </div>
</div>

<div class="readme-summary">
  <p align="center">
    This library is an <a href="https://angular.io/">Angular 2+</a> wrap around <a href="http://materializecss.com/">Materialize</a> library, a responsive CSS/JS framework that implements Material Design specifications from Google.
  </p>
  <p align="center">
    The purpose of this library is to simplify the usage within the Angular framework.
  </p>
  <p align="center">
    Demo and documentation : <a href="https://sherweb.github.io/ng2-materialize/">https://sherweb.github.io/ng2-materialize/</a>
  </p>
</div>

## Why ng2-materialize?

The main purpose of this library is to simplify the usage of Materialize within the Angular framework which make it more dynamic. To illustrate this, we have Playground sections in severak component demo page.

### Initialization simplified

One thing that Materialize ask to do for pretty much every components is to initialize it using JQuery. In our implementation, the initializations are done automatically.

### Quirks

Materialize does not work perfectly "out of the box" when used with Angular, we had to fix a lot of "quirks"...

For instance, for mz-input we handle the label so it can animate when the value is changed programmatically.

As another example, using mz-select, the communication between the dropdown created by Materialize and the native select HTML element is handle by our implementation otherwise there is a desynchronization between the value of NgModel/NgControl and the select element.

And this is just some examples of many more...

### Injection

Materialize modals ask to put the modal HTML directly into the DOM while we offer the possibility to inject a component on the fly using MzModalService.

### MediaService

We added the MediaService that allow to customize some behavior according to the view port size.

### Reactive Form support

Another nice advantage that we added to our implementation is the Form Validation. Materialize only provide HTML5 validation while we added support for Reactive Form allowing a more flexible way to do form validation following the same Material Design guidelines.

### We haven't wrapped everything ...

Although we didn't wrapped everything yet, all the Materialize library is available to be used when using our package. Aslo, some of the CSS classes have not been wrapped into directive as it already does the work pretty well!

Or simply wrap the existing Materialize components that already meets the Material Design specifications. No need to be an HTML/CSS expert, only to know the Angular 2+ components.

## Installation

The following commands will add Ng2-Materialize library to your `package.json` file along with it dependencies: Materialize CSS, jQuery and Mdi (Mdi icons library is optional as your are free to use the icon library of your choice).

```
npm install --save ng2-materialize
npm install --save mdi    #optional
```

Don't forget to include jQuery, Materialize, and Mdi in your application.

If you are using [Angular-CLI](https://github.com/angular/angular-cli) you can follow the example below :

#### .angular-cli.json

```diff
"styles": [
  "styles.scss",
+ "../node_modules/materialize-css/dist/css/materialize.min.css",
+ "../node_modules/mdi/css/materialdesignicons.min.css"   #optional
],
"scripts": [
+ "../node_modules/jquery/dist/jquery.min.js",
+ "../node_modules/materialize-css/dist/js/materialize.min.js"
],
```

#### tsconfig

```diff
{
  "compilerOptions": {
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [
      "es2016",
      "dom"
    ],
    "outDir": "../out-tsc/app",
    "target": "es5",
    "module": "es2015",
    "baseUrl": "",
    "types": [
+      "jquery",
+      "materialize-css"
    ]
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ]
}
```

See also [Angular CLI 3rd Party Library Installation](https://github.com/angular/angular-cli/wiki/overview#global-library-installation) and [Using MaterializeCSS with your Angular 2 Angular CLI App](https://medium.com/@ladyleet/using-materializecss-with-your-angular-2-angular-cli-app-2eb64b05a1d2#.8p3uba85g).

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
+ import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';

@NgModule({
  imports: [
+    NoopAnimationsModule,
  ],
})
export class AppModule { }
```

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

## Available features

 Page listed in [Native CCS Class](./native-css-class) will not be wrapped.

### Components

* Badge
* Button
* Card
* Checkbox
* Collapsible
* Collection
* Datepicker
* Dropdown
* Form validation
* Icon
* Input
* Modal
* Navbar
* Parallax
* Progress
* Radio-Button
* Select
* Sidenav
* Spinner
* Switch
* Textarea
* Toast
* Tooltip

### Services

* Media

## Demo application

A demo application is available at [https://sherweb.github.io/ng2-materialize/](https://sherweb.github.io/ng2-materialize/), or refer to the `./demo-app` folder and its [README](./demo-app/README.md).

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
