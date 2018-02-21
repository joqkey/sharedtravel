import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { SearchPage } from '../../pages/search/search';

@NgModule({
  declarations: [
   // HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
     
  ],
  exports: [
    //HomePage
  ]
})
export class HomePageModule {}
