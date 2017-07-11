import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { CarpoPage } from '../pages/carpo/carpo';
import { AutocompletePage } from '../pages/carpo/autocomplete';
import { ActPage } from '../pages/act/act';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';
import { Auth } from '../providers/auth';
import { Post } from '../providers/post';
import { Profile } from '../providers/profile';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { ForgetPage } from '../pages/forget/forget';
import { ProfilePage } from '../pages/profile/profile';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PostPage} from '../pages/post/post';
import { Device } from '@ionic-native/device';
import { ObjectValuesPipe } from '../pages/post/post';
import { ObjectValues1Pipe } from '../pages/act/act';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import moment from 'moment';

var config = {
    apiKey: "AIzaSyAVoQl_Z0asWml_xFfNtvJfe33hTeUUSCk",
    authDomain: "second-abacus-154519.firebaseapp.com",
    databaseURL: "https://second-abacus-154519.firebaseio.com",
    projectId: "second-abacus-154519",
    storageBucket: "second-abacus-154519.appspot.com",
    messagingSenderId: "1032461163172"
  };
@NgModule({
  declarations: [
    AutocompletePage,
    CarpoPage,
     ActPage,
     ObjectValues1Pipe,
    ObjectValuesPipe,
    PostPage,
    ProfilePage,
    ForgetPage ,
  RegisterPage,
    LoginPage,
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    
    IonicImageViewerModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
     
        tabsHideOnSubPages: true,
     
    }),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AutocompletePage,
      CarpoPage,
     ActPage,
    PostPage,
    ProfilePage,
    ForgetPage ,
    RegisterPage,
    LoginPage,
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
  Geolocation,
    Device,
    Post,
    Transfer,
    Camera,
    File,
    FilePath,
    AngularFireDatabase,
    Profile,
    Facebook,
   AngularFireAuth ,
    Auth,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
