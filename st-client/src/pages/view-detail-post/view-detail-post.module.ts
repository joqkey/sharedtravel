import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDetailPostPage } from './view-detail-post';

@NgModule({
  declarations: [
    //ViewDetailPostPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDetailPostPage),
  ],
  exports: [
    //ViewDetailPostPage
  ]
})
export class ViewDetailPostPageModule {}
