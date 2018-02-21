import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ModalContentPage } from '../pages/post/post';
import { ViewDetailPostPage } from '../pages/view-detail-post/view-detail-post';
import { ChangeUserDetailsPage } from '../pages/change-user-details/change-user-details';
import { MyPostsPage } from '../pages/my-posts/my-posts';

import { SearchPage } from '../pages/search/search';
import { PostPage } from '../pages/post/post';
import { UserPage } from '../pages/user/user';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';


import { AuthService } from '../providers/auth-service/auth-service';
import { IonicStorageModule } from '@ionic/Storage';
import { PlacesServiceProvider } from '../providers/places-service/places-service';
import { PostServiceProvider } from '../providers/post-service/post-service';
import { DatePipe } from '@angular/common';
import{CallNumber} from '@ionic-native/call-number';
import {Camera} from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';
import { UserSettingsServiceProvider } from '../providers/user-settings-service/user-settings-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ModalContentPage,
    ViewDetailPostPage,
    ChangeUserDetailsPage,
    SearchPage, 
    PostPage,
    UserPage,
    RegisterPage,
    MyPostsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ModalContentPage,
    ViewDetailPostPage,
    ChangeUserDetailsPage,
    SearchPage,
    PostPage,
    UserPage,
    RegisterPage,
    MyPostsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    IonicStorageModule,
    PlacesServiceProvider,
    PostServiceProvider,
    DatePipe,
    CallNumber,
    Camera,
    Geolocation,
    UserSettingsServiceProvider
  ]
})
export class AppModule {}