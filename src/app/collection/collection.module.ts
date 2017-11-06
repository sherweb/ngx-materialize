import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MzAvatarDirective } from './avatar/avatar.directive';
import { MzCollectionHeaderComponent } from './collection-header/collection-header.component';
import { MzCollectionItemComponent } from './collection-item/collection-item.component';
import { MzCollectionLinkDirective } from './collection-link/collection-link.directive';
import { MzCollectionComponent } from './collection.component';
import { MzSecondaryContentDirective } from './secondary-content/secondary-content.directive';

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
