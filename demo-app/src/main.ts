import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

// Workaround to copy README.md from root folder into dist folder on build as it is
// currently impossible with Angular-CLI to get files outside the src folder with assets
// http://stackoverflow.com/a/39881977/5583283
const readme = require('file?name=[name].[ext]!../../README.md');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
