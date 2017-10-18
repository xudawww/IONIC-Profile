import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CarpoPage } from '../carpo/carpo';
import { PostPage } from '../post/post';
import {Profile} from '../../providers/profile';
import {BuddychatPage } from '../buddychat/buddychat';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CarpoPage;
  tab3Root = BuddychatPage ;
  tab4Root = PostPage;
  constructor(public pro:Profile) {
   
  }
}
