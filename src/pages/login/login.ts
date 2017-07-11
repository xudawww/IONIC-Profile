import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Auth} from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import * as firebase from 'firebase/app';
import firebase1 from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: any;
  email: any;
  password: any;
  private todo : FormGroup;
  constructor(public navCtrl: NavController,public fb:Facebook,public db:AngularFireDatabase,public auth:Auth,private formBuilder: FormBuilder,public loadingCtrl: LoadingController ) {

  }


 ngOnInit():any {
  
    
      this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['',Validators.required],
    });
   }


logForm() {
     window.localStorage.removeItem('user');
 this.email=this.todo.controls['email'].value;
 this.password=this.todo.controls['pass'].value;
 this.auth.login(this.email,this.password).then((user)=>{
  window.localStorage.setItem("user",user.uid);
  this.db.object("userProfile/"+user.uid).update({id:user.uid})

  this.navCtrl.push(TabsPage);
 





 }).catch(Error=>{
 alert("账户密码不匹配。");

 })


    
  }
 fblogin(){
   this.fb.login(['email','public_profile']).then((facebookData) => {

   let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
      console.log('facebook accessToken: ' + facebookData.authResponse.accessToken);
     firebase.auth().signInWithCredential(provider).then((success)=>{


   this.auth.update1(success.uid,success.email,success.photoURL,success.displayName);
   localStorage.setItem('user',success.uid);
   this.db.object("userProfile/"+success.uid).update({id:success.uid})
    
      this.navCtrl.setRoot(TabsPage);
       return true;

      }).catch((error)=>{
       alert(error);
       return false;
      });
      
})
 
}


 showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: '载入中...'
        });
 
        this.loading.present();
 
    }

reg(){

  this.navCtrl.push(RegisterPage);
}
resetPwd(){
 this.navCtrl.push(ForgetPage);
}



ionViewWillEnter() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.transform = 'translateY(56px)';
        });
    } // end if
}

ionViewDidLeave() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.transform = 'translateY(0)';
        });
    } // end if
}
}
