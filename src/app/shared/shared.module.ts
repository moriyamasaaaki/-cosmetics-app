import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CardComponent } from './card/card.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    CardComponent
  ]
})
export class SharedModule { }
