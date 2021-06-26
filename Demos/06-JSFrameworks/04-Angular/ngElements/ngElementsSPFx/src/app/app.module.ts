import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { NgElementsWpWebPartComponent } from './ng-elements-wp-web-part/ng-elements-wp-web-part.component';

@NgModule({
  declarations: [
    NgElementsWpWebPartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [NgElementsWpWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(NgElementsWpWebPartComponent, { injector: this.injector });
    customElements.define('app-ng-elements-wp-web-part', el);
  }
}
