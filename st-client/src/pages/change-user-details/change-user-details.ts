import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { UserSettingsServiceProvider } from '../../providers/user-settings-service/user-settings-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ChangeUserDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-change-user-details',
  templateUrl: 'change-user-details.html',
})
export class ChangeUserDetailsPage {
  elementToChange: string;
  passChange = {
    oldPass: '',
    newPass: '',
    newPassSec: ''
  }
  phoneNumber: string;
  user: User;
  disbableButton: boolean;

  constructor(public nav: NavController, public navParams: NavParams,
    private auth: AuthService, private alertController: AlertController,
    private userSettings: UserSettingsServiceProvider, public viewCtrl: ViewController) {
    this.elementToChange = navParams.get('data');
    this.user = this.auth.getCurrentUser();
    this.disbableButton = true;
  }

  checkPassword() {
    if (this.passChange.oldPass != '') {
      this.userSettings.checkPassword(this.user.email, this.passChange.oldPass).then((value) => {
        if (value == 1) {
          this.disbableButton = false;
        } else {
          this.popWrongPasswordMessage();
          this.passChange.oldPass = '';
          this.disbableButton = true;
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  changePasswordByEmail() {
    if (this.passChange.newPass.length >= 3) {
      if (this.passChange.newPass == this.passChange.newPassSec) {
        this.userSettings.changePasswordByEmail(this.user.email, this.passChange.newPass).then((value) => {
          //SUCCESS
          this.nav.pop();
        }, (error) => {
          this.popErrorMessage();
        });
      } else {
        this.popDifferentPasswordMessage();
      }
    } else {
      this.popUpValidateUserInputMessage("Password");
    }
    // this.dismiss();
  }

  loadUpdatedUserDetails(email: string) {
    this.auth.getUserDetails(email).then((value) => {
      //SUCCESS
      this.popSuccessfullyUpdatedUserPropertieMessage();
      //this.dismiss();
    }, (error) => {
      this.popErrorMessage();
    });
  }

  changePhoneNumberByEmail() {
    if (this.validatePhonenumber()) {
      this.userSettings.changePhoneNumberByEmail(this.user.email, this.phoneNumber).then((value) => {
        //SUCCESS
        this.loadUpdatedUserDetails(this.user.email);
        this.nav.pop();
      }, (error) => {
        console.log(error);
      });
    }
  }

  public validatePhonenumber(): boolean {
    var numberReg = /^\d+$/;
    var checkBulgarianFormat1 = /08[7-9][0-9]{7}/;
    var checkBulgarianFormat2 = /09[7-9][0-9]{7}/;
    if (this.phoneNumber.length < 3) {
      this.popUpValidateUserInputMessage("Phone Number");
      this.phoneNumber = '';
      return false;
    } else if (!numberReg.test(this.phoneNumber)) {
      this.popUpOnlyNumbersAllowedMessage();
      this.phoneNumber = '';
      return false;
    } else if (!checkBulgarianFormat1.test(this.phoneNumber) && !checkBulgarianFormat2.test(this.phoneNumber)) {
      this.popUpWrongPhonenumberFormatMessage();
      this.phoneNumber = '';
      return false;
    }
    return true;
  }

  public popWrongPasswordMessage() {

    let alert = this.alertController.create({
      title: 'Wrong Passwords',
      subTitle: 'Please Try Again',
      buttons: ['OK']
    });
    alert.present();
  }

  public popDifferentPasswordMessage() {

    let alert = this.alertController.create({
      title: 'Different passwords',
      subTitle: 'Please Try Again',
      buttons: ['OK']
    });
    alert.present();
  }

  public popErrorMessage() {

    let alert = this.alertController.create({
      title: 'Error Occured While Updating',
      subTitle: 'Error',
      buttons: ['OK']
    });
    alert.present();
  }

  public popSuccessfullyUpdatedUserPropertieMessage() {

    let alert = this.alertController.create({
      title: 'Successfully Updated',
      buttons: ['OK']
    });
    alert.present();
  }

  public popUpValidateUserInputMessage(field: string) {
    let alert = this.alertController.create({
      title: 'More than 3 symbols required!',
      subTitle: field,
      buttons: ['OK']
    });
    alert.present();
  }

  public popUpOnlyNumbersAllowedMessage() {
    let alert = this.alertController.create({
      title: "Only Numbers Allowed In User's Phone Number",
      subTitle: "",
      buttons: ['OK']
    });
    alert.present();
  }

  public popUpWrongPhonenumberFormatMessage() {
    let alert = this.alertController.create({
      title: "Wrong Phonenumber format!",
      subTitle: "Only : 08... or 09... allowed",
      buttons: ['OK']
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
