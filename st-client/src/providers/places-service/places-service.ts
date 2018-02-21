import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/Storage';
import 'rxjs/add/operator/map';

@Injectable()
export class PlacesServiceProvider {
  api_key = "AIzaSyDJPTst7JO0L8Ad7c6Plx6uLvNhvIQnqGk";
  geolocatedCity: string;
  geoData: object;
  baseUrl = "http://192.168.0.14:8090";
  constructor(private http: Http, private alertController: AlertController, private loadingCtrl: LoadingController,
    private storage: Storage, private auth: AuthService) {
  }

  getAllPlaces() {
    let headers = new Headers();
    headers.append('Authorization', this.auth.getAuthenticationToken());
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+'/home/post/getAllPlaces', options).subscribe(data => {
        resolve(data.json());
      }, error => {
        this.popUpServerErrorMessage();
      });
    });

  }

  getCityByCoordinate(lat: string, lng: string) {
    let latlng = lat + "," + lng;
    let headers = new Headers();
    let params = { "language": 'en', "latlng": latlng, "key": this.api_key };

    let options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers,
      params: params
    });

    return new Promise((resolve, reject) => {
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json', options).subscribe(data => {
        this.getCity(data.json());
      }, error => {
        this.popUpServerErrorMessage();
      });
    });
  }

  public popUpServerErrorMessage() {

    let alert = this.alertController.create({
      title: 'Backend Exception',
      subTitle: 'Server Error occured',
      buttons: ['OK']
    });
    alert.present();
  }

  getGeolocatedCity(): string {
    return this.geolocatedCity;
  }

  getCity(data: object) {
    this.geoData = data['results'];
    for (var i = 0; i < Object.keys(this.geoData).length; i++) {
      if (this.geoData[i].types[0] == 'locality') {
        this.geolocatedCity = this.geoData[i].formatted_address;
        var array = this.geolocatedCity.split(",");
        this.geolocatedCity = array[0];
      }
    }
  }

}
