import { NgModule } from '@angular/core';

import { MzAvatarDirective } from './avatar';
import { MzCollectionHeaderComponent } from './collection-header';
import { MzCollectionItemComponent } from './collection-item';
import { MzCollectionLinkDirective } from './collection-link';
import { MzCollectionComponent } from './collection.component';
import { MzSecondaryContentDirective } from './secondary-content';

@NgModule({
  declarations: [
    MzAvatarDirective,
    MzCollectionComponent,
    MzCollectionItemComponent,
    MzCollectionLinkDirective,
    MzCollectionHeaderComponent,
    MzSecondaryContentDirective,
  ],
  exports: [
    MzAvatarDirective,
    MzCollectionComponent,
    MzCollectionItemComponent,
    MzCollectionLinkDirective,
    MzCollectionHeaderComponent,
    MzSecondaryContentDirective,
  ],
})
export class MzCollectionModule { }
