import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../../pages/register/register';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  loginCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.nav = nav;
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    // this.showLoading();
    this.auth.login(this.loginCredentials).then((value) => {
      //SUCCESS
      this.pageChange();
    }, (error) => {
      //FAILURE
      this.loading.dismiss();
      console.log(error);
    });
  }

  public facebookLogin() {
    this.auth.facebookLogin().then((value) => {
      //SUCCESS
      this.pageChange();
    }, (error) => {
      //FAILURE
      this.loading.dismiss();
      console.log(error);
    });
  }

  pageChange() {
    this.nav.setRoot(HomePage);
  }
}