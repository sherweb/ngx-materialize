# ng2-materialize [![CircleCI](https://circleci.com/gh/sherweb/ng2-materialize.svg?style=shield&circle-token=4f457a3c93c34ad9cdf21cbe53605dad94f21955)](https://circleci.com/gh/sherweb/ng2-materialize)

This library is an [Angular 2](https://angular.io/) wrap around [Materialize](http://materializecss.com/) library, a responsive CSS/JS framework that implements Material Design specifications from Google.

The purpose of this library is to simplify the usage within the Angular framework.

## Why ng2-materialize ?

We are aware that alternatives exposing Material Design components already exist. But in our case, we want to rely on a stable css framework that does not depend on a specific js framework.

With [Materialize](http://materializecss.com/) we already know the possibilities that this framework offers, it remains to wrap in Angular component the Materialize components that we want to use.

If you want to use a component that is not yet implemented, simply wrap the existing Materialize that already meets the Material Design specifications. No need to be an HTML/CSS expert, only to know the Angular 2 components. Or if you are in a hurry, you can use it directly in HTML rather than in Angular component.

## Installation

```
npm install --save ng2-materialize

npm install --save materialize-css jquery@2.2.4 mdi
```

Don't forget to include jQuery, Materialize and Mdi into your application.

If you are using [Angular-CLI](https://github.com/angular/angular-cli) you can follow the example below :
#### angular-cli.json
```diff
 "styles": [
   "styles.scss",
+  "../node_modules/materialize-css/bin/materialize.css",
+  "../node_modules/mdi/css/materialdesignicons.css"
 ],
 "scripts": [
+  "../node_modules/jquery/dist/jquery.js",
+  "../node_modules/materialize-css/bin/materialize.js"
 ],
```

Currently, Materialize is not provided by this library, you will have to install it and link it into your application.

```
npm install --save materialize-css
```

See also [Angular CLI 3rd Party Library Installation](https://github.com/angular/angular-cli#3rd-party-library-installation) and [Using MaterializeCSS with your Angular 2 Angular CLI App](https://medium.com/@ladyleet/using-materializecss-with-your-angular-2-angular-cli-app-2eb64b05a1d2#.8p3uba85g).

### Note

Currently, we have an issue with the compiler-cli (ngc) and inline templates. That's why this library is temporarly distributed with source in plain TypeScript and it will be transpiled and `.metadata.json` created with your application.

We use this library with Angular-CLI and it works well, but at this time, we can not guarantee that it works in all environments.

## Usage

You must import `MaterializeModule` inside your module to be able to use materialize components.

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
* Button
* Card
* Collapsible
* Icon
* Navbar
* Parallax
* Progress
* Sidenav
* Spinner

## Demo application

A demo application is available, please refer to the `./demo-app` folder and his [README](./demo-app/README.md).

## Road map

We (at SherWeb) are currently wrapping the components we need, and unfortunately we can't provide a specific road map.

If some components are missing, feel free to contribute.

## Contribute

Contributions are always welcome.

Make sure that :
- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

And you are ready to go.