import { Component } from '@angular/core';
import { ColumnData } from 'projects/ng-components-library/src/lib/components/ng-data-table/ng-data-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dtColumns: ColumnData[] = [
    {
      sortable: false,
      name: 'test',
      label: 'Test'
    }
  ];

  dtsColumns = [
    {
      sortable: true,
      name: 'test',
      label: 'Test'
    },
    {
      sortable: false,
      name: 'prova',
      label: 'Prova'
    }
  ];

  dtValues = [{ test: '1', prova: 'a' }, { test: '2', prova: 'b' }];
}
