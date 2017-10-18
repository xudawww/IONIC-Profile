import { Component,ViewChild,ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController,ModalController } from 'ionic-angular';
import { DriverrePage } from '..//driverre/driverre';
import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase } from 'angularfire2-offline/database'; 
  import * as firebase from 'firebase/app';
  import  firebase1 from 'firebase';

@Component({
  selector: 'page-carpo',
  templateUrl: 'carpo.html'
})
export class CarpoPage {
  public driverlist:AfoListObservable<any>;
  public isToggled: boolean;
  ifneedre;
  public ifdriver: boolean;
  constructor(public navCtrl: NavController,public db: AngularFireOfflineDatabase,platform: Platform,private modalCtrl: ModalController) {

  this.driverlist=this.db.list("/driver");
  this.ifneedre=true;
  this.isToggled = false;
  this.ifdriver=false;
  
  
  
  
  
  
  }
  ionViewDidLoad(){

    this.isToggled = false;




  }
  openModal() {
    
this.navCtrl.push(DriverrePage);

  }

}
