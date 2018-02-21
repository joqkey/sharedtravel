import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';
import { Storage } from '@ionic/Storage';
import { LoginPage } from '../../pages/login/login';
import { Geolocation } from '@ionic-native/geolocation';

import { SearchPage } from '../../pages/search/search';
import { PostPage } from '../../pages/post/post';
import { UserPage } from '../../pages/user/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedTab: string;
  currentUser: string;
  currentCity: string;

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
    private storage: Storage, private places: PlacesServiceProvider, private geo: Geolocation,
    private loadingCtrl: LoadingController) {
    this.nav = nav;

    this.getUserDetailsByUserName(this.auth.getUserEmail());
    this.currentCity = this.places.getGeolocatedCity();
  }

  ionViewWillEnter() {
    this.selectedTab = 'home';
  }

  onImgClick(startCity: string, endCity: string) {
    this.onPageChange();
    this.nav.push(SearchPage, {
      startDest: startCity,
      endDest: endCity
    });
  }

  getUserDetailsByUserName(email: string) {
    if (email == '') {
      this.nav.setRoot(LoginPage);
    } else {
      this.auth.getUserDetails(email);
    }
  }

  onPageChange() {
    let loading = this.loadingCtrl.create({
      content: 'Opening page...',
      dismissOnPageChange: true
    });
    loading.present();
  }


  goToPostPage(): void {
    this.onPageChange();
    this.nav.push(PostPage);
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