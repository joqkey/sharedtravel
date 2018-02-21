import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, Loading, LoadingController } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';
import { AlertController } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ModalContentPage } from '../../pages/post/post';
import { ViewDetailPostPage } from '../../pages/view-detail-post/view-detail-post';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number';

import { HomePage } from '../../pages/home/home';
import { PostPage } from '../../pages/post/post';
import { UserPage } from '../../pages/user/user';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  loading: Loading;
  user: User;
  selectedTab: string;
  selectedStartCity: string;
  selectedEndCity: string;
  public arrayOfKeys;
  public dataObject;
  public eventDatAndTime = {
    date: ''
  };

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthService,
    private alertController: AlertController,
    private placesService: PlacesServiceProvider, public modalCtrl: ModalController,
    private postService: PostServiceProvider, public datepipe: DatePipe, private call: CallNumber,
    private loadingCtrl: LoadingController) {

    if (navParams.get("startDest") == undefined && navParams.get("endDest") == undefined) {
      this.selectedStartCity = 'From';
      this.selectedEndCity = 'To';
    } else {
      this.selectedStartCity = navParams.get("startDest");
      this.selectedEndCity = navParams.get("endDest");
    }

    this.user = this.auth.getCurrentUser();

    //set timezone - javascript data library problem
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.eventDatAndTime.date = localISOTime;

  }

  ionViewWillEnter() {
    this.selectedTab = 'search';
  }


  openStartDestinationModal() {

    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.selectedStartCity = data;
      } else {
        this.selectedStartCity = 'From';
      }
    });

  }

  openEndDestinationModal() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.selectedEndCity = data;
      } else {
        this.selectedEndCity = 'To';
      }
    });
  }

  searchPost() {
    if (this.selectedStartCity != '' && this.selectedStartCity != 'From'
      && this.selectedEndCity != '' && this.selectedEndCity != 'To'
    ) {
      this.postService.searchPost(this.selectedStartCity, this.selectedEndCity,
        this.datepipe.transform(this.eventDatAndTime.date, 'yyyy-MM-dd')).then((value) => {
          //SUCCESS
          this.dataObject = value;
          //if there is no posts
          if (Object.keys(this.dataObject).length == 0) {
            this.popNoResultsFoundMessage();
          }
        }, (error) => {
          //FAILURE
          console.log(error);
        });
    } else {
      //fill all mandatory field
      this.popFillMandatoryFiledsMessage();
    }
  }

  deletePost(id: number) {
    this.postService.deletePost(id).then((data) => {
      this.searchPost();
    }, (error) => {
      console.log(error);
    });


  }

  openDetailPostView(data: object) {
    let modal = this.modalCtrl.create(ViewDetailPostPage, { data: data, showButtons: false });
    modal.present();
  }

  public popFillMandatoryFiledsMessage() {

    let alert = this.alertController.create({
      title: 'Please, Complete All Required Fields',
      subTitle: 'Complete All Required Fields',
      buttons: ['OK']
    });
    alert.present();
  }

  public popNoResultsFoundMessage() {

    let alert = this.alertController.create({
      title: 'No Results Found',
      subTitle: 'Please, try again later',
      buttons: ['OK']
    });
    alert.present();
  }

  async callNumber(phoneNumber: string): Promise<any> {
    try {
      await this.call.callNumber(phoneNumber, true)
    } catch (e) {
      console.log(e);
    }
  }

  onPageChange() {
    let loading = this.loadingCtrl.create({
      content: 'Opening page...',
      dismissOnPageChange: true // I don't want to dismiss on page change
    });
    loading.present();
  }

  goToHomePage(): void {
    this.onPageChange();
    this.nav.push(HomePage);
  }

  goToPostPage(): void {
    this.onPageChange();
    this.nav.push(PostPage);
  }

  goToUserPage(): void {
    this.onPageChange();
    this.nav.push(UserPage);
  }

}
