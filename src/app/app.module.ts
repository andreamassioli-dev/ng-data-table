import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgComponentsModule } from 'projects/ng-components-library/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
