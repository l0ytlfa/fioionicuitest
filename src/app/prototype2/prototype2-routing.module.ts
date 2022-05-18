import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Prototype2Page } from './prototype2.page';

const routes: Routes = [
  {
    path: '',
    component: Prototype2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Prototype2PageRoutingModule {}
