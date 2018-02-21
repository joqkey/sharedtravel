import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import CryptoJS from 'crypto-js';

export class User {
  name: string;
  email: string;
  phonenumber: string;

  constructor(email: string, name: string, phonenumber: string) {
    this.email = email;
    this.name = name;
    this.phonenumber = phonenumber;
  }
}


@Injectable()
export class AuthService {

  loading: Loading;
  error: string;
  token: string[];
  authHeader: string;
  currentUser: User;
  baseUrl = "http://192.168.0.14:8090";

  constructor(private http: Http, private alertController: AlertController, private loadingCtrl: LoadingController,
    private storage: Storage) {

  }

  public login(credentials) {
    this.showLoading();
    const headers = new Headers();
    const creds = 'username=' + credentials.email + '&password=' + credentials.password;
    headers.append('Authorization', 'Basic ' + btoa(credentials.email + ':' + credentials.password));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/login', creds, { headers: headers }).subscribe(data => {
        this.authHeader = data.headers.toJSON().authorization + '';
        //this.token = this.authHeader.split(' ');
        this.authenticationSuccess(this.authHeader);
        this.currentUser = new User(credentials.email, 'dummy_name', 'dummy_phone');
        this.dismissLoading();
        resolve(this.authHeader);
        reject('');
      }, error => {
        this.dismissLoading();
        this.popUpWrongCredentialsMessage(error);
      });
    });

  }

  public register(credentials) {
    this.showLoading();
    let password = CryptoJS.SHA256(credentials.password).toString();
    console.log(password);
    const headers = new Headers();
    const creds = 'username=' + credentials.name + '&password=' + password + '&email=' + credentials.email
      + '&phonenumber=' + credentials.phonenumber;
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/register', creds, { headers: headers }).subscribe(data => {
        this.dismissLoading();
        resolve(data);
        reject(data);
      }, error => {
        this.dismissLoading();
        this.popUpInvalidUsernamesMessage(error);
      });
    });
  }

  //Get Details for cuurently loged user by email
  public getUserDetails(email: string) {
    let params = { "email": email };
    let headers = new Headers();
    headers.append('Authorization', this.getAuthenticationToken());
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers,
      params: params
    });


    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/home/userDetails', options).subscribe(data => {
        resolve(data);
        this.parseUserProperties(data.json());
      }, error => {
        this.popUpWrongCredentialsMessage(error);
      });
    });

    // }
  }

  checkMail(email: string) {
    this.showLoading();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = { "email": email };

    let options = new RequestOptions({
      headers: headers,
      params: params
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/register/checkMail', options).subscribe(data => {
        resolve(data.json());
        this.dismissLoading();
      }, error => {
        reject(error);
        this.dismissLoading();

      });
    });
  }

  parseUserProperties(data: Object) {
    var username;
    var phonenumber;
    var email;
    var keys = Object.keys(data);

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == 'username') {
        username = data[keys[i]];
      } else if (keys[i] == 'email') {
        email = data[keys[i]];
      } else if (keys[i] == 'phonenumber') {
        phonenumber = data[keys[i]];
      }
    }

    this.currentUser = new User(email, username, phonenumber);
  }

  authenticationSuccess(token) {
    this.storage.set('token', token);
  }

  getAuthenticationToken(): string {

    if (this.authHeader == null || this.authHeader == '' || this.authHeader === undefined) {
      this.storage.get('token').then((value) => {
        this.authHeader = value;
      });
    }
    return this.authHeader;
  }

  public popUpWrongCredentialsMessage(error: any) {
    if (error.status == 401) {
      let alert = this.alertController.create({
        title: 'Unathorized',
        subTitle: 'Wrong credentials. Please, try again!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  public popUpInvalidUsernamesMessage(error: any) {
    let alert = this.alertController.create({
      title: 'Username already exist!',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
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

  public getUserEmail(): string {
    if (this.currentUser == null) {
      return '';
    } else {
      return this.currentUser.email;
    }
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public logout() {

  }
}