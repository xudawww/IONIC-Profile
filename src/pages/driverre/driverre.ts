import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import  firebase1 from 'firebase';
import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase } from 'angularfire2-offline/database'; 
/**
 * Generated class for the DriverrePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-driverre',
  templateUrl: 'driverre.html',
})
export class DriverrePage {
  private todo : FormGroup;
  constructor(public navCtrl: NavController, public db:AngularFireOfflineDatabase,public formBuilder:FormBuilder,public navParams: NavParams) {
  }

  ngOnInit():any {
    
      
        this.todo = this.formBuilder.group({
          checkbox: ['', Validators.required],
          wechat:['', Validators.required]
        
      });
     }
  
  ionViewDidLoad() {
    
  }



  push(){
   
    this.db.object("driver/"+localStorage.getItem("user")).publish()




  }



}
