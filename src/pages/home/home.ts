import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import {Profile} from '../../providers/profile';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public pro:Profile) {

  }
profile(){
const id= localStorage.getItem('user');
this.pro.setid(id);
this.pro.load();
this.navCtrl.push(ProfilePage);



}
}
