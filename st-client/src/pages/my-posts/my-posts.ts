import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { ViewDetailPostPage } from '../../pages/view-detail-post/view-detail-post';

/**
 * Generated class for the MyPostsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-posts',
  templateUrl: 'my-posts.html',
})
export class MyPostsPage {
  user: User;
  public arrayOfKeys;
  public dataObject;

  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthService,
    private alertController: AlertController, public modalCtrl: ModalController,
    private postService: PostServiceProvider, public viewCtrl: ViewController) {
    this.user = this.auth.getCurrentUser();
    this.searchMyActivePost();
  }


  searchMyActivePost() {
    this.postService.searchMyActivePost(this.user.email).then((value) => {
      //SUCCESS
      this.dataObject = value;
      //if there is no posts
      if (Object.keys(this.dataObject).length == 0) {
        this.popNoResultsFoundMessage();
      }
    }, (error) => {
      //FAILURE
      console.log(error);
    });

  }

   openDetailPostView(data: object) {
    let modal = this.modalCtrl.create(ViewDetailPostPage, { data: data, showButtons: true });
    modal.present();
  }

  public popNoResultsFoundMessage() {

    let alert = this.alertController.create({
      title: 'No Results Found',
      subTitle: 'Please, try again later',
      buttons: ['OK']
    });
    alert.present();
  }

  deletePost(id: number) {
    this.postService.deletePost(id).then((data) => {
      this.searchMyActivePost();
    }, (error) => {
      console.log(error);
    });


  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
