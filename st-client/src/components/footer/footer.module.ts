import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FooterComponent } from './footer';

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    IonicPageModule.forChild(FooterComponent),
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterComponentModule {}
