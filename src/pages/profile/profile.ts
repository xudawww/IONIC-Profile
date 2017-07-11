import { Component,NgZone } from '@angular/core';
import { NavController, ActionSheetController,AlertController,ToastController, NavParams, Loading ,Platform,LoadingController } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup  } from '@angular/forms';
import {Auth} from '../../providers/auth';
import {Profile} from '../../providers/profile';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import  firebase1 from 'firebase';

import { AngularFireDatabase,FirebaseObjectObservable  } from 'angularfire2/database';
declare var cordova: any;

/*
  Generated class for the Resetpwd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',

})
export class ProfilePage {
  id:any;
modi:boolean;
ifmodi:boolean;
hidebutton:boolean;
name:any;
data:FirebaseObjectObservable<any>;
img:any;
 loading: Loading;
pic:any;
sex:any;
male1:boolean;
female1:boolean;
stat:any;
gene:boolean;
private todo : FormGroup;
  constructor(public navCtrl: NavController, public zone: NgZone,public db: AngularFireDatabase,public toastCtrl: ToastController,public platform: Platform, public actionSheetCtrl: ActionSheetController,private camera: Camera, private transfer: Transfer, private file: File, private filePath:FilePath,public auth:Auth,public pro:Profile,public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  this.modi=false;
  this.hidebutton=false;
  this.gene=true;
  this.male1=false;
  this.female1=false;
  this.ifmodi = true;
 

}

public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择上传图片来源',
      buttons: [
        {
          text: '本地上传',
          handler: () => {
            this.selectPhoto();
          }
        },
        {
          text: '拍照',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
public takePicture() {
  // Create options for the Camera Dialog


 this.camera.getPicture({
  destinationType:this.camera.DestinationType.DATA_URL,
  quality: 50,
  sourceType: this.camera.PictureSourceType.CAMERA,
  encodingType: this.camera.EncodingType.JPEG,
  saveToPhotoAlbum: true,
   correctOrientation:true
 

}).then(imageData => {
 this.img= imageData
   this.pic="data:image/jpeg;base64,"+this.img;
    
      
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
selectPhoto(): void {

 this.camera.getPicture({
  destinationType:this.camera.DestinationType.DATA_URL,
  quality: 50,
  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  encodingType: this.camera.EncodingType.JPEG,
  correctOrientation:true


}).then(imageData => {
     this.img=imageData
     this.pic="data:image/jpeg;base64,"+this.img;
     

    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });





}
uploadPhoto(){
   let loading = this.loadingCtrl.create({
    content: '稍等图片正在上传'
  });
  loading.present();
  
  if(this.img!=undefined)
  {const id =localStorage.getItem('user');
   firebase1.storage().ref().child("images/"+id+".jpg").putString(this.img,'base64',{ contentType: 'image/jpeg' })
  .then((save)=>{

 this.data.update({pic:save.downloadURL });



  })
  
  
  .catch(e=>{
   alert(e);

});
  
  }
loading.dismiss();
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 ngOnInit():any {

 this.id =localStorage.getItem('user');
 this.data= this.db.object("/userProfile/"+this.id);



      this.todo = this.formBuilder.group({
      name: ['', Validators.maxLength(10)],
      status:['', Validators.maxLength(50)],
      sex:[''],
      camp:[''],
      pro:['']


    });
   }

logout(){
this.auth.logout();
localStorage.removeItem('user');
this.navCtrl.setRoot(LoginPage);

}
modify(){
 this.modi=true;
 this.gene=false;
this.female1=false;
this.male1=false;

}

reset(){

this.modi=false;
 this.gene=true;



}


confirm(){
  this.uploadPhoto();
 

  //update({name:name,pic:pic,status:sta,sex:sex});
  if(this.todo.valid!=true)
  {  alert ('昵称最长不可以超过10个字，状态最长不可以超过50个字'); }
  else{
  const name =this.todo.controls['name'].value;
  if(name!=undefined)
   { this.name=name;
     this.data.update({name:this.name});}
 const status1= this.todo.controls['status'].value;
  if(status1!="")
  { this.stat=status1;
  this.data.update({status:this.stat});}

  const sex =this.todo.controls['sex'].value;
  if(sex!=""){
   this.sex=sex;
  
 
   this.data.update({sex:this.sex});
 
  }

 const camp=this.todo.controls['camp'].value;

   if(camp!=""){
   
  
 
   this.data.update({camp:camp});
 
  }


const pro=this.todo.controls['pro'].value;

 if(pro!=""){
   
  
 
   this.data.update({pro:pro});
 
  }

   if(this.sex=="male")
   {this.female1=false;this.male1=true;}
   else if (this.sex=="female")
   {this.female1=true;this.male1=false;  }
  
   this.gene=true;
   this.modi=false;
this.presentToast('修改成功');


}



} 

}