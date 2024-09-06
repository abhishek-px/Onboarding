import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { EditBannerComponent } from './edit-banner/edit-banner.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    BannerComponent,
    BannerListComponent,
    AddBannerComponent,
    EditBannerComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgxSpinnerModule,
    NgxTrimDirectiveModule
  ]
})
export class BannerModule { }
