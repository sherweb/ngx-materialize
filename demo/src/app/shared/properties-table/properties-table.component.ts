import { Component, Input } from '@angular/core';

export interface IPropertyRow {
  name: string;
  mandatory: boolean;
  type: string;
  description: string;
  defaultValue?: string;
}

@Component({
  selector: 'app-properties-table',
  templateUrl: './properties-table.component.html',
  styleUrls: ['./properties-table.component.scss'],
})
export class PropertiesTableComponent {
  @Input() properties: IPropertyRow[];
}
