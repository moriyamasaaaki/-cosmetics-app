import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {
    path: 'terms',
    pathMatch: 'full',
    data: { title: '利用規約' },
    component: TermsComponent
  },
  {
    path: 'privacy',
    pathMatch: 'full',
    data: { title: 'プライバシー' },
    component: PrivacyComponent
  },
  {
    path: 'about',
    pathMatch: 'full',
    data: { title: 'Mens-Labとは' },
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntlRoutingModule { }
