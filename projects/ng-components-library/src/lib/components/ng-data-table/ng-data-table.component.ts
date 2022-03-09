import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { NgDataTableActionsDirective } from '../../directives/ng-data-table-actions/ng-data-table-actions.directive';
import { NgDataTableColumnDirective } from '../../directives/ng-data-table-column/ng-data-table-column.directive';

@Component({
  selector: 'ng-data-table',
  templateUrl: './ng-data-table.component.html',
  styleUrls: ['./ng-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgDataTableComponent implements OnInit, OnChanges {

  @Input() columns!: ColumnData[];
  @Input() tableClasses: string = 'table-sm table-hover';
  @Input() values!: any[];
  @Input() sort: string = '';
  @Input() sortable: boolean = true;
  @Input() loading: boolean = true;
  @Output() selected = new EventEmitter<any>();
  @Output() sorted = new EventEmitter<string>();

  @ContentChild(NgDataTableActionsDirective) actionsTemplate?: NgDataTableActionsDirective;
  @ContentChildren(NgDataTableColumnDirective) columnTemplates?: QueryList<NgDataTableColumnDirective>;

  private _sort: Map<string, string> = new Map();

  get columnsTotal() {
    let total = this.columns.length;
    if (this.actionsTemplate) {
      total++;
    }
    return total;
  }

  ngOnInit(): void {
    this.parseSort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sort) {
      this.parseSort();
    }
  }

  parseSort() {
    this._sort = new Map();
    this.sort.split(',').map(item => {
      const order = item[0] === '-' ? '-' : '';
      const key = order ? item.substring(1) : item;
      this._sort.set(key, order)
    })
  }

  select(value: any) {
    this.selected.emit(value);
  }

  getValue(column: ColumnData, value: any) {
    if (column.name.indexOf('.') !== -1) {
      const methodChain = column.name.split('.');
      let result = value;
      for (const method of methodChain) {
        result = result ? result[method] : null;
      }
      return result || column.default;
    }
    return value[column.name] || column.default;
  }

  sortBy(column: ColumnData) {
    if (!this.sortable) {
      return;
    }
    const name = column.sort || column.name;
    let order = this._sort.get(name);
    if (order == null) {
      order = '';
    } else {
      order = order === '-' ? '' : '-';
    }
    const sort = `${order}${name}`;
    this.sorted.emit(sort);
  }

  isSortedBy(column: ColumnData) {
    const name = column.sort || column.name;
    return this._sort.get(name) != null;
  }

  isSortedByDesc(column: ColumnData) {
    const name = column.sort || column.name;
    return this._sort.get(name) === '-';
  }

  getColumnClass(column: ColumnData) {
    const columnClass: { [key: string]: boolean } = {
      'col-order-by': this.isSortedBy(column)
    };
    columnClass[`col-data__${column.name}`] = true;
    if (column.class) {
      columnClass[column.class] = true;
    }
    return columnClass;
  }

  getColumnTemplate(column: ColumnData) {
    return this.columnTemplates?.find(ct => ct.columnName === column.name);
  }
}

export interface ColumnData {
  sortable: boolean;
  sort?: string;
  name: string;
  class?: string;
  default?: string;
  label: string;
}