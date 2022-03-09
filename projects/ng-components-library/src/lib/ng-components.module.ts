import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgDataTableComponent } from './components/ng-data-table/ng-data-table.component';
import { NgDataTableActionsDirective } from './directives/ng-data-table-actions/ng-data-table-actions.directive';
import { NgDataTableColumnDirective } from './directives/ng-data-table-column/ng-data-table-column.directive';

@NgModule({
  declarations: [
    NgDataTableComponent,
    NgDataTableActionsDirective,
    NgDataTableColumnDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgDataTableComponent,
    NgDataTableActionsDirective,
    NgDataTableColumnDirective
  ]
})
export class NgComponentsModule { }
