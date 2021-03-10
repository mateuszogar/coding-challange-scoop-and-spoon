import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   children: authRoutes
  // },
  // {
  //   path: 'company/:companyName',
  //   component: DeepLinkView
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
