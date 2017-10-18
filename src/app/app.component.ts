import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ImgCacheService } from 'ng-imgcache';
@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public imgCache: ImgCacheService) {
    platform.ready().then(() => {
 
      statusBar.styleDefault();
      splashScreen.hide();
      if(window.localStorage.getItem('user'))
         {
            this.rootPage=TabsPage;

         }
         else
          this.rootPage=LoginPage;


    });



  }
}
