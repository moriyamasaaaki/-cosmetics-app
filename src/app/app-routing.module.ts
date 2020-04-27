import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'article',
    pathMatch: 'full',
    loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'intl',
    loadChildren: () => import('./intl/intl.module').then(m => m.IntlModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
