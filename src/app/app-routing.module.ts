import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SearchResultComponent } from './search-result/search-result.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: {
      title: "Men's-ClearLab",
      description: '男性美容の知識やおすすめアイテムなどを共有するサービスです。'
    },
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
    data: {
      title: '記事作成'
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'favorite',
    data: {
      title: 'お気に入りした記事'
    },
    loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    data: {
      title: '記事一覧'
    },
    loadChildren: () => import('./list/list.module').then(m => m.ListModule),
  },
  {
    path: 'mypage',
    data: {
      title: 'マイページ'
    },
    loadChildren: () => import('./mypage/mypage.module').then(m => m.MypageModule),
  },
  {
    path: 'contact',
    data: {
      title: 'お問い合わせ'
    },
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'search',
    component: SearchResultComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
