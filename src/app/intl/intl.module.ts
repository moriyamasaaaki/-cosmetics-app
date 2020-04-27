import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlRoutingModule } from './intl-routing.module';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [AboutComponent, PrivacyComponent, TermsComponent],
  imports: [
    CommonModule,
    IntlRoutingModule
  ]
})
export class IntlModule { }
