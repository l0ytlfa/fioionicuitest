import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Prototype2PageRoutingModule } from './prototype2-routing.module';

import { Prototype2Page } from './prototype2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Prototype2PageRoutingModule
  ],
  declarations: [Prototype2Page]
})
export class Prototype2PageModule {}
