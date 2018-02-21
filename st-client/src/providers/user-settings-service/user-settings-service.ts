import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/Storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import CryptoJS from 'crypto-js';

@Injectable()
export class UserSettingsServiceProvider {
  loading: Loading;
  baseUrl = "http://192.168.0.14:8090";

  constructor(private http: Http, private alertController: AlertController, private loadingCtrl: LoadingController,
    private storage: Storage, private auth: AuthService) {
  }

  changePasswordByEmail(email: string, newPass: string) {
    this.showLoading();

    let headers = new Headers();
    headers.append('Authorization', this.auth.getAuthenticationToken());
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let password = CryptoJS.SHA256(newPass).toString();
    
    let body = 'email=' + email + '&newPass=' + password;

    let options = new RequestOptions({
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'/home/user/changePassword', body, options).subscribe(data => {
        resolve(data);
        this.dismissLoading();
      }, error => {
        reject(error);
        this.dismissLoading();

      });
    });
  }

  changePhoneNumberByEmail(email: string, phonenumber: string) {
    this.showLoading();

    let headers = new Headers();
    headers.append('Authorization', this.auth.getAuthenticationToken());
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
    let body = 'email=' + email + '&phonenumber=' + phonenumber;

    let options = new RequestOptions({
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'/home/user/changePhonenumber', body, options).subscribe(data => {
        resolve(data);
        this.dismissLoading();
      }, error => {
        reject(error);
        this.dismissLoading();

      });
    });
  }

  checkPassword(email: string, oldPass: string) {
    this.showLoading();

    let headers = new Headers();
    headers.append('Authorization', this.auth.getAuthenticationToken());
    headers.append('Content-Type', 'application/json');
    let password = CryptoJS.SHA256(oldPass).toString();
    let params = { "email": email, "oldPass": password };

    let options = new RequestOptions({
      headers: headers,
      params: params
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+'/home/user/checkPassword', options).subscribe(data => {
        resolve(data.json());
        this.dismissLoading();
      }, error => {
        reject(error);
        this.dismissLoading();

      });
    });
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
