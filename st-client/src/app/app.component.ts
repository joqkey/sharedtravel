import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlacesServiceProvider } from '../providers/places-service/places-service';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  currentCity: string;
  geoData: object;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private places: PlacesServiceProvider,
    private geo: Geolocation
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var lat;
      var lng;
      this.geo.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        this.places.getCityByCoordinate(lat, lng).then((data) => {
        }, (error) => {
          console.log(error);
        });
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  getCity(data: object) {
    this.geoData = data['results'];
    for (var i = 0; i < Object.keys(this.geoData).length; i++) {
      if (this.geoData[i].types[0] == 'locality') {
        this.currentCity = this.geoData[i].formatted_address;
        var array = this.currentCity.split(",");
        this.currentCity = array[0];
      }
    }
  }

}

