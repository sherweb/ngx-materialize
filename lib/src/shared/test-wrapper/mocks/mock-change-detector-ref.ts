import { ChangeDetectorRef } from '@angular/core';

export class MockChangeDetectorRef implements ChangeDetectorRef {
  markForCheck(): void { }
  detach(): void { }
  detectChanges(): void { }
  checkNoChanges(): void { }
  reattach(): void { }
}
