import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./feature-modules/home/home.module').then(m => m.HomeModule) },
  { path: 'posts/:category', loadChildren: () => import('./feature-modules/posts/posts.module').then(m => m.PostsModule) },
  { path: 'post/:slug', loadChildren: () => import('./feature-modules/post/post.module').then(m => m.PostModule) },
  { path: 'about', loadChildren: () => import('./feature-modules/about/about.module').then(m => m.AboutModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
