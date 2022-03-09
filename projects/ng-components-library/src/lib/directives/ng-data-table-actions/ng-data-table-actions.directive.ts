import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngDataTableActions]'
})
export class NgDataTableActionsDirective {

  constructor(public templateRef: TemplateRef<any>) { }

}
