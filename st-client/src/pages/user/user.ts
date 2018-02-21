import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, Loading, LoadingController } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { UserSettingsServiceProvider } from '../../providers/user-settings-service/user-settings-service';
import { AlertController } from 'ionic-angular';
import { ChangeUserDetailsPage } from '../../pages/change-user-details/change-user-details';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SearchPage } from '../../pages/search/search';
import { PostPage } from '../../pages/post/post';
import { HomePage } from '../../pages/home/home';
import { MyPostsPage } from '../../pages/my-posts/my-posts';


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  loading: Loading;
  user: User;
  selectedTab: string;
  imgSource: string;
  base64Image: string;

  constructor(public nav: NavController, public navParams: NavParams,
    private auth: AuthService, private alertController: AlertController,
    private userSettings: UserSettingsServiceProvider, public modalCtrl: ModalController,
    private cam: Camera, private loadingCtrl: LoadingController) {
    this.user = this.auth.getCurrentUser();
  }

  ionViewWillEnter() {
    this.selectedTab = 'user';
  }


  openChangePasswordModal() {
    let modal = this.modalCtrl.create(ChangeUserDetailsPage, { data: 'Password' });
    modal.present();
  }

  openChangePhonenumberModal() {
    let modal = this.modalCtrl.create(ChangeUserDetailsPage, { data: 'Phonenumber' });
    modal.present();
    modal.onDidDismiss(() => this.user = this.auth.getCurrentUser());
  }

  chooseImg() {
    const options: CameraOptions = {
      destinationType: this.cam.DestinationType.DATA_URL,
      sourceType: this.cam.PictureSourceType.PHOTOLIBRARY
    }

    this.cam.getPicture(options).then((imgData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imgData;
      this.imgSource = imgData;
    }, (error) => {

    });
  }

  public popNoResultsFoundMessage(base64: any) {

    let alert = this.alertController.create({
      title: base64,
      subTitle: 'Please, try again later',
      buttons: ['OK']
    });
    alert.present();
  }

  onPageChange() {
    let loading = this.loadingCtrl.create({
      content: 'Opening page...',
      dismissOnPageChange: true
    });
    loading.present();
  }

  openDetailPostView() {
    let modal = this.modalCtrl.create(MyPostsPage);
    modal.present();
  }

  goToHomePage(): void {
    this.onPageChange();
    this.nav.push(HomePage);
  }

  goToPostPage(): void {
    this.onPageChange();
    this.nav.push(PostPage);
  }

  goToSearchPage(): void {
    this.onPageChange();
    this.nav.push(SearchPage);
  }

}
