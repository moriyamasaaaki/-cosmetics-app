import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { FormGuard } from './guards/form.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'intl',
    loadChildren: () => import('./intl/intl.module').then(m => m.IntlModule)
  },
  {
    path: 'form',
    pathMatch: 'full',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListModule),
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
