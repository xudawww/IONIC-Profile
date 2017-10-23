import { Component } from '@angular/core';
import { NavController,LoadingController  } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Auth} from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import * as firebase from 'firebase/app';
import firebase1 from 'firebase';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Facebook } from '@ionic-native/facebook';
import { Base64 } from '@ionic-native/base64';
import { Network } from '@ionic-native/network';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
var cordova;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: any;
  email: any;
  base64Image: any;
  ava:any;
  password: any;
  private todo : FormGroup;
  
  storageDirectory: string = '';
  
  constructor(public navCtrl: NavController,private platform:Platform,private transfer: Transfer, private file: File,public network: Network,public fb:Facebook,public db:AngularFireDatabase,public auth:Auth,private formBuilder: FormBuilder,public loadingCtrl: LoadingController ,private base64: Base64) {


 


  }
  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
	let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    this.fb.login(permissions)
    .then(function(response){
      alert(JSON.stringify(response))
      let userId = response.authResponse.userID;
      let params = new Array<string>();
      var enx=env
      //Getting name and gender properties
      env.fb.api("/me?fields=name,gender", params)

     
      .then(user=> {
        alert(JSON.stringify(user));
        alert(userId+" "+user.email)
        var picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        localStorage.setItem("ava",picture);
        localStorage.setItem("name",user.name);
        
        enx.auth.update1(userId,user.email,picture,user.name);
      
      })
        .then(()=>{
        
          env.navCtrl.setRoot(TabsPage);

        })
      })
    } 
  
 ngOnInit():any {
  
  
      this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['',Validators.required],
    });
   }
   convertToDataURLviaCanvas(url, outputFormat):any{
    return new Promise((resolve, reject) => {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      resolve(dataURL);
      canvas = null;
    };
    img.src = url;
  });
}
 




logForm() {

    if (this.network.type === 'none')
    {

      alert("no internet");

   } 
    else{
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('ava');
  window.localStorage.removeItem('name');
  this.email=this.todo.controls['email'].value;
  this.password=this.todo.controls['pass'].value;
  this.auth.login(this.email,this.password).then((user)=>{
  window.localStorage.setItem("user",user.uid);
  
  this.db.object("userProfile/"+user.uid).update({id:user.uid})
  this.db.object("userProfile/"+user.uid).subscribe(e=>{
    window.localStorage.setItem("ava",e.pic);
    window.localStorage.setItem("name",e.name);






  })
  this.navCtrl.push(TabsPage);
 



 

 }).catch(Error=>{
 alert("账户密码不匹配。");

 })

    }       
    
  }


      

  

  

 fblogin(){
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('ava');
  window.localStorage.removeItem('name');
  

   this.fb.login(['email','public_profile']).then((facebookData) => {


   let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
      console.log('facebook accessToken: ' + facebookData.authResponse.accessToken);
     firebase.auth().signInWithCredential(provider).then((success)=>{
    
     var ava=  "https://graph.facebook.com/" + success.providerData[0].uid + "/picture?type=large"
      
 
              
      
            const fileTransfer: TransferObject = this.transfer.create();
      
       
            alert(JSON.stringify(success))
            fileTransfer.download(ava, this.file.dataDirectory+ "ava.png").then((entry) => {
      
              
  
              this.file.readAsDataURL(this.file.dataDirectory,"ava.png").then(e=>{
                this.ava= e.toString();
                localStorage.setItem('user',success.uid);
                window.localStorage.setItem("ava",this.ava );
                window.localStorage.setItem("name",success.displayName);
             
         
            this.auth.update1(success.uid,"none",this.ava ,success.displayName);
         
            this.db.object("userProfile/"+success.uid).update({id:success.uid});
            this.navCtrl.setRoot(TabsPage);
            return true;
              })
         
  
      
            });
      
       
      
            });
      
         

       
    
      

      }).catch((error)=>{
       alert(error);
       return false;
      });
      

 
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

getBase64ImageFromURL(url: string) {
  return Observable.create((observer: any) => {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    if (!img.complete) {
      img.onload = () => {
        observer.next(this.getBase64Image(img));
        observer.complete();
      };
      img.onerror = (err) => {
        observer.error(err);
      };
    } else {
      observer.next(this.getBase64Image(img));
      observer.complete();
    }
  });
}

getBase64Image(img: HTMLImageElement) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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
