import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CardComponent } from './card/card.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    CardComponent
  ]
})
export class SharedModule { }
