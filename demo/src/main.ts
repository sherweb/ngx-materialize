import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';
import { environment } from './environments/environment';

// Workaround to copy README.md from root folder into dist folder on build as it is
// currently impossible with Angular-CLI to get files outside the src folder with assets
// http://stackoverflow.com/a/39881977/5583283
const readme = require('file-loader?name=[name].[ext]!../../README.md'); // tslint:disable-line:no-unused-variable

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, { preserveWhitespaces: true })
  .catch(err => console.log(err));
