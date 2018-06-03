import { NgModule } from '@angular/core';

import { MzAvatarDirective } from './avatar/index';
import { MzCollectionHeaderComponent } from './collection-header/index';
import { MzCollectionItemComponent } from './collection-item/index';
import { MzCollectionLinkDirective } from './collection-link/index';
import { MzCollectionComponent } from './collection.component';
import { MzSecondaryContentDirective } from './secondary-content/index';

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
