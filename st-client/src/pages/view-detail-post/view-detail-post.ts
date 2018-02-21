import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-view-detail-post',
  templateUrl: 'view-detail-post.html',
})
export class ViewDetailPostPage {
  dataFromPage: object;
  showButtons: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  private call: CallNumber) {
    this.dataFromPage = navParams.get('data');
    this.showButtons = navParams.get('showButtons');
  }

   async callNumber(phoneNumber: string): Promise<any> {
    try {
      await this.call.callNumber(phoneNumber, true)
    } catch (e) {
      console.log(e);
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
