import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/Storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostServiceProvider {
  loading: Loading;
  baseUrl = "http://192.168.0.14:8090";

  constructor(private http: Http, private alertController: AlertController, private loadingCtrl: LoadingController,
    private storage: Storage, private auth: AuthService) {
  }

  public sharePost(startDest: string, endDest: string, startTime: string, startDate: string,
    desc: string, username: string, email: string, phonenumber: string) {

    this.showLoading();

      let headers = new Headers();
    headers.append('Authorization', this.auth.getAuthenticationToken());
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

		let body = 'email=' + email + '&startDest=' + startDest+ '&endDest=' + endDest+ '&startTime=' + startTime+ '&startDate=' 
      + startDate+ '&username=' + username+ '&phonenumber=' + phonenumber+ '&desc=' + desc;

    let options = new RequestOptions({
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'/home/post/share', body, options).subscribe(data => {
        this.dismissLoading();
        resolve(data);
      }, error => {
        reject(error);
        this.dismissLoading();

      });
    });

  }

  public searchPost(startDest: string, endDest: string, date: string) {

    this.showLoading();

    let headers = new Headers();
    headers.append('Authorization', this.auth.getAuthenticationToken());
    headers.append('Content-Type', 'application/json');

		 let params = { "startDest": startDest, "endDest":endDest, "startDate":date };

    let options = new RequestOptions({
      headers: headers,
      params: params
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+'/home/search/findPosts', options).subscribe(data => {
        this.dismissLoading();
        resolve(data.json());
      }, error => {
        reject(error);
        this.dismissLoading();

      });
    });

  }

  public searchMyActivePost(email: string) {

    this.showLoading();

    let headers = new Headers();
    headers.append('Authorization', this.auth.getAuthenticationToken());
    headers.append('Content-Type', 'application/json');

		 let params = { "email": email};

    let options = new RequestOptions({
      headers: headers,
      params: params
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl+'/home/search/findMyActivePosts', options).subscribe(data => {
        this.dismissLoading();
        resolve(data.json());
      }, error => {
        reject(error);
        this.dismissLoading();

      });
    });

  }


  deletePost(id: number){
    this.showLoading();

      let headers = new Headers();
    headers.append('Authorization', this.auth.getAuthenticationToken());
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

		let body = 'id=' + id;

    let options = new RequestOptions({
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'/home/search/deletePost', body, options).subscribe(data => {
        this.dismissLoading();
        resolve(data);
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
