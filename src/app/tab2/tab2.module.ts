import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PhotoService } from '../services/photo.service';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ParallaxFioritalHeaderDirective } from '../directives/parallax-fiorital-header.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ScrollingModule
  ],
  declarations: [Tab2Page,ParallaxFioritalHeaderDirective]
})
export class Tab2PageModule {}
