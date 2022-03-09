import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngDataTableColumn]'
})
export class NgDataTableColumnDirective {

  @Input() columnName!: string;

  constructor(public templateRef: TemplateRef<any>) { }

}
