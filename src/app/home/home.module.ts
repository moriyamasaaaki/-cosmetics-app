import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FirstViewComponent } from './first-view/first-view.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent, FirstViewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatButtonModule
  ]
})
export class HomeModule { }
