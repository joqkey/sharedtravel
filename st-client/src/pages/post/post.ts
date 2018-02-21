import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { DatePipe } from '@angular/common';

import { SearchPage } from '../../pages/search/search';
import { HomePage } from '../../pages/home/home';
import { UserPage } from '../../pages/user/user';


@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  user: User;
  selectedStartCity: string;
  selectedEndCity: string;
  desc = '';
  selectedTab: string;

  public eventDatAndTime = {
    date: '',
    timeStart: '00:00'
  }
  selectedStartCityText: string;
  selectedEndCityText: string;
  loading: Loading;

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthService,
    private alertController: AlertController,
    private placesService: PlacesServiceProvider, public modalCtrl: ModalController,
    private postService: PostServiceProvider, public datepipe: DatePipe, private loadingCtrl: LoadingController) {

    this.user = this.auth.getCurrentUser();
    this.selectedStartCityText = 'Select Start Destination';
    this.selectedEndCityText = 'Select End Destination';

    //set timezone - javascript data library problem
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.eventDatAndTime.date = localISOTime;
  }

  ionViewWillEnter() {
    this.selectedTab = 'post';
  }


  openStartDestinationModal() {

    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.selectedStartCity = data;
        this.selectedStartCityText = 'Start Destination: ' +  this.selectedStartCity;
      } else {
        this.selectedStartCity = '';
      }
    });

  }

  openEndDestinationModal() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data != undefined) {
        this.selectedEndCity = data;
        this.selectedEndCityText = 'End Destination: ' + this.selectedEndCity;
      } else {
        this.selectedEndCity = '';
      }
    });
  }


  sharePost() {
    if (this.validate()) {
      this.postService.sharePost(this.selectedStartCity, this.selectedEndCity, this.eventDatAndTime.timeStart.toString(),
        this.datepipe.transform(this.eventDatAndTime.date, 'yyyy-MM-dd'), this.desc, this.user.name, this.user.email, this.user.phonenumber).then((value) => {
          //SUCCESS
          this.popSuccessfullySharedPostMessage();
        }, (error) => {
          //FAILURE
          this.popFailedToSharePostMessage();
        });
    }
  }

  validate(): boolean {
    var today = new Date();
    if (this.selectedStartCity == '' && this.selectedStartCity == null
      && this.selectedEndCity == '' && this.selectedEndCity == null
    ) {
      this.popFillMandatoryFiledsMessage();
      return false;
    } else if (new Date(this.eventDatAndTime.date).getDate() < today.getDate()) {
      this.popWrongDateMessage();
      return false;
    }else if(this.selectedStartCity == this.selectedEndCity){
      this.popWrongStartAndEndDest();
      return false;
    }
    return true;
  }

  public popFillMandatoryFiledsMessage() {

    let alert = this.alertController.create({
      title: 'Please, Complete All Required Fields',
      subTitle: 'Complete All Required Fields',
      buttons: ['OK']
    });
    alert.present();
  }

  public popSuccessfullySharedPostMessage() {

    let alert = this.alertController.create({
      title: 'Post Were Successfully Shared',
      subTitle: 'Enjoy!',
      buttons: ['OK']
    });
    alert.present();
  }

  public popFailedToSharePostMessage() {

    let alert = this.alertController.create({
      title: 'Server Error!',
      subTitle: 'Server Is Down!',
      buttons: ['OK']
    });
    alert.present();
  }

  public popWrongDateMessage() {

    let alert = this.alertController.create({
      title: 'Wrong Date!',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }

  public popWrongStartAndEndDest() {

    let alert = this.alertController.create({
      title: 'End destination have to be different from start destination!',
      subTitle: '',
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

  goToHomePage(): void {
    this.onPageChange();
    this.nav.push(HomePage);
  }

  goToSearchPage(): void {
    this.onPageChange();
    this.nav.push(SearchPage);
  }

  goToUserPage(): void {
    this.onPageChange();
    this.nav.push(UserPage);
  }

}

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-searchbar  (input)="getItems($event)" (ionClear)="resetSearchbox($event)" placeholder="Search City"></ion-searchbar>
  </ion-toolbar>
</ion-header>

<ion-content>

<ion-list>
   
</ion-list>

<ion-fab right bottom>
   <button (click)="dismiss();" ion-fab>Done!</button>
 </ion-fab>

  <ion-list radio-group [virtualScroll]="places">
    <ion-item *virtualItem="let place">
      <ion-label>{{place}}</ion-label>
      <ion-radio (click)="select(place);"></ion-radio>
    </ion-item>
  </ion-list>
  
</ion-content>
`
})
export class ModalContentPage {

  places: String[];
  resetAllPlaces: String[];
  selectedCity: String;
  loading: Loading;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private auth: AuthService,
    private placesService: PlacesServiceProvider,
    private loadingCtrl: LoadingController
  ) {

    this.places = [];
    this.resetAllPlaces = [];
    this.showLoading();
    if (this.resetAllPlaces.length == 0) {
      this.placesService.getAllPlaces().then((value) => {
        //SUCCESS
        this.parseAllPlaces(value);
      }, (error) => {
        //FAILURE
        console.log(error);
      });
    }
    this.dismissLoading();
  }


  parseAllPlaces(data: object) {
    for (var i = 0; i < Object.keys(data).length; i++) {
      this.places[i] = data[i].placeName;
    }
    this.resetAllPlaces = Array.from(this.places);
  }

  initializeItems() {
    this.places = Array.from(this.resetAllPlaces);
  }

  resetSearchbox(ev: any) {
    this.initializeItems();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;


    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.places = this.places.filter((item) => {
        return (item.toLowerCase().startsWith(val.toLowerCase()));//indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  select(place) {
    this.selectedCity = place;
  }

  dismiss() {
    this.viewCtrl.dismiss(this.selectedCity);
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

}

