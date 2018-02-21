import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeUserDetailsPage } from './change-user-details';

@NgModule({
  declarations: [
    //ChangeUserDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeUserDetailsPage),
  ],
  exports: [
    //ChangeUserDetailsPage
  ]
})
export class ChangeUserDetailsPageModule {}
