import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsContentComponent } from './news-content/news-content.component';


const routes: Routes = [
  {path: 'news/:pageNo', component:  NewsContentComponent},
  {path: 'news', component:  NewsContentComponent},
  { path: '',   redirectTo: '/news', pathMatch: 'full' },
  { path: '**',   redirectTo: '/news', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
