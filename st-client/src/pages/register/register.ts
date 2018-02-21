import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerCredentials = { email: '', password: '', name: '', phonenumber: '' };

  constructor(public navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }

  register() {
    this.auth.register(this.registerCredentials).then((value) => {
      this.popUpSuccessfullyCreatedUserMessage();
      this.navCtrl.pop();
    }, (error) => {
      console.log(error);
    });
  }

  public validate() {
    if (this.validatePassword() && this.validateName() && this.validatePhonenumber()) {
      this.register();
    }
  }

  checkMail() {
    this.auth.checkMail(this.registerCredentials.email).then((data) => {
      if (data != 0) {
        this.popUpMailAlreadyExistMessage();
        this.registerCredentials.email = '';
      }
    }, (error) => {
      console.log(error);
    });
  }

  public validatePassword(): boolean {
    if (this.registerCredentials.password.length <= 3) {
      this.popUpValidateUserInputMessage("Password");
      this.registerCredentials.password = '';
      return false;
    }
    return true;
  }

  public validateName(): boolean {
    var alphabetReg = /^[a-zA-Z]*$/;
    if (this.registerCredentials.name.length < 3) {
      this.popUpValidateUserInputMessage("Name");
      this.registerCredentials.name = '';
      return false;
    } else if (!alphabetReg.test(this.registerCredentials.name)) {
      this.popUpOnlyLetterAllowedMessage();
      this.registerCredentials.name = '';
      return false;
    }
    return true;
  }

  public validatePhonenumber(): boolean {
    var numberReg = /^\d+$/;
    var checkBulgarianFormat1 = /08[7-9][0-9]{7}/;
    var checkBulgarianFormat2 = /09[7-9][0-9]{7}/;
    if (this.registerCredentials.phonenumber.length < 3) {
      this.popUpValidateUserInputMessage("Phone Number");
      this.registerCredentials.phonenumber = '';
      return false;
    } else if (!numberReg.test(this.registerCredentials.phonenumber)) {
      this.popUpOnlyNumbersAllowedMessage();
      this.registerCredentials.phonenumber = '';
      return false;
    } else if (!checkBulgarianFormat1.test(this.registerCredentials.phonenumber) && !checkBulgarianFormat2.test(this.registerCredentials.phonenumber)) {
      this.popUpWrongPhonenumberFormatMessage();
      this.registerCredentials.phonenumber = '';
      return false;
    }
    return true;
  }

  public popUpValidateUserInputMessage(field: string) {
    let alert = this.alertCtrl.create({
      title: 'More than 3 symbols required!',
      subTitle: field,
      buttons: ['OK']
    });
    alert.present();
  }

  public popUpOnlyLetterAllowedMessage() {
    let alert = this.alertCtrl.create({
      title: "Only Letter Allowed In User's  Name",
      subTitle: "",
      buttons: ['OK']
    });
    alert.present();
  }

  public popUpOnlyNumbersAllowedMessage() {
    let alert = this.alertCtrl.create({
      title: "Only Numbers Allowed In User's Phone Number",
      subTitle: "",
      buttons: ['OK']
    });
    alert.present();
  }

  public popUpSuccessfullyCreatedUserMessage() {
    let alert = this.alertCtrl.create({
      title: "User was created successfully",
      subTitle: "",
      buttons: ['OK']
    });
    alert.present();
  }

  public popUpMailAlreadyExistMessage() {
    let alert = this.alertCtrl.create({
      title: "Mail already exist!",
      subTitle: "",
      buttons: ['OK']
    });
    alert.present();
  }

  public popUpWrongPhonenumberFormatMessage() {
    let alert = this.alertCtrl.create({
      title: "Wrong Phonenumber format!",
      subTitle: "Only : 08... or 09... allowed",
      buttons: ['OK']
    });
    alert.present();
  }


}
