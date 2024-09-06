import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BannerComponent } from './banner.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { EditBannerComponent } from './edit-banner/edit-banner.component';

const routes: Routes = [
  {
    path:"",
    component:BannerComponent,
    children:[
     {
      path:"list",
      component:BannerListComponent
     },
     {
      path:"add",
      component:AddBannerComponent
     },
     {
      path:"edit/:id",
      component:EditBannerComponent
     },
    //  {
    //   path:"list",
    //   component:BannerListComponent
    //  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
