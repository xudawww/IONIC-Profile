import { Component ,ViewChild,ElementRef} from '@angular/core';
import {Content} from 'ionic-angular'
import { NavController,ToastController ,LoadingController,ActionSheetController} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import {Profile} from '../../providers/profile';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Post} from '../../providers/post';
import { FormBuilder, Validators,FormGroup  } from '@angular/forms';
import * as firebase from 'firebase/app';
import  firebase1 from 'firebase';
import {Observable} from 'rxjs/Observable';
import {Pipe,PipeTransform} from '@angular/core';
import { Network } from '@ionic-native/network';
import  * as moment from 'moment-timezone';
import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase } from 'angularfire2-offline/database'; 
import { ActPage } from '../act/act';
import 'rxjs/Rx';

import { Platform } from 'ionic-angular';
@Pipe({
  name: 'objectValues'
})

export class ObjectValuesPipe implements PipeTransform {
  transform(obj: any):any {
    let result = [];
    for (var key in obj) {
      
      if (obj.hasOwnProperty(key)) {
        result.push(obj[key]);
      }

     
    }
    return result;
  }
}
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
   @ViewChild('sketchElement')sketchElement:ElementRef;
    @ViewChild('post1')post1:ElementRef;
    @ViewChild(Content)content:Content;
  public rent: AfoListObservable<any[]>;
  base64Image;
  public life: AfoListObservable<any[]>;
  public new: AfoListObservable<any[]>;
  public path:any;
  public act:AfoObjectObservable<any>;
    public act1:AfoListObservable<any[]>;
  public actid:any; 
  public myid:any
   public photos:any;
   public counter:any;
   public receiver:any;
   public hidden: boolean[] = [];
   public rn:any;
  public showcom:boolean;
   public rid:any;
   public hidecom:boolean;
   post:any;
     public photos1:any;
     public isToggled: boolean;
  selectedSegment: string;
   private todo : FormGroup;
    private com : FormGroup;
    public ifcanhide:boolean;
 loading: any;

  constructor(public navCtrl: NavController,public plt: Platform,public network:Network,private device: Device,public pro1:Profile,public db:AngularFireOfflineDatabase,private formBuilder: FormBuilder,public actionSheetCtrl: ActionSheetController,public pro:Profile,public toastCtrl: ToastController,private camera: Camera,public loadingCtrl: LoadingController) {
this.selectedSegment = '1';
this.isToggled = true;

 this.post=false; 
 this.hidecom=false;
 this.showcom=true;
this.receiver="";
this.ifcanhide=false;
this.plt.registerBackButtonAction(e=>{

if(this.post==true)
{

  this.post=false;
  this.todo.controls['post'].setValue("");

}



},1)
 //alert('Device UUID is: ' + this.device.uuid);
}
public shareFabClicked( i: number): void {
 
    if (this.hidden[i]) {
        this.hidden.splice(i, 1); // Remove the flag if the buttons are already hidden, so that they get displayed again.
    } else {
        this.hidden[i] = true;
    }
}
public hidecinput(){

if(this.post==true&&this.ifcanhide==true ){

  this.post=false;

}
this.com.controls['comment'].setValue("");

}


gopage(){

this.navCtrl.push(ActPage);



}
ionViewDidEnter(){
  const id = localStorage.getItem('user');
this.act1=this.db.list("userProfile/"+id+"/act");

this.myid=id;
this.pro.setid(id);
this.pro.load();
this.act= this.db.object("userProfile/"+id);





}
ngOnInit(){
  this.pro.setid(this.myid);
  this.pro.load();
const id = localStorage.getItem('user');
this.myid=id;
this.pro.setid(id);
this.pro.load();
  let loading = this.loadingCtrl.create({
   
  });
  loading.present();


this.photos=[];
this.photos1=[];

this.rent=this.db.list('/rent',{
query:{
  orderByChild:'date1'



}



});


this.new= this.db.list('/new',{
query:{
  orderByChild:'date1'



}

});
this.life= this.db.list('/life',{
query:{
  orderByChild:'date1'



}

});
this.todo = this.formBuilder.group({
      post: ['', Validators.compose([Validators.required, ,Validators.maxLength(200)])],
   
    });
this.com =this.formBuilder.group({
      comment: ['', Validators.compose([Validators.required, ,Validators.maxLength(200)])],
   
    });

loading.dismiss();




}
ifdelete(name:any):boolean{

  if (name==this.myid){

    return true;
  }
else{


  return false;
}


}



ifdelete1(name:any,name2:any):boolean{

  if (name==this.myid|| name2==this.myid){

    return true;
  }
else{


  return false;
}


}
cancel(){
this.com.controls['comment'].setValue("");
this.post=false;


}
postgo(){


 //// const va=this.sketchElement.nativeElement.innerText;
 // alert(va);
 let loading = this.loadingCtrl.create({
   
  });
  loading.present();


  var cat="";
 let post = this.todo.controls['post'].value;
if(this.selectedSegment == '1')
{ cat = "rent";}
if(this.selectedSegment == "2")
{ cat = "life";}
if(this.selectedSegment == '3')
{ cat = "new";}


const push=this.db.list(cat).push({date1:0-new Date(moment().tz("America/Toronto")).getTime(),date:new Date().getFullYear()+"年"+new Date().getMonth()+"月"+new Date().getDate()+"日"+new Date().getHours()+"点"+new Date().getMinutes()+"分",post:post,id:this.pro.id,name:window.localStorage.getItem("name"),text:post,pic:window.localStorage.getItem("ava")});
const key=push.key;
this.db.object(cat+"/"+key).update({pid:key});


var a=0;
this.photos.forEach(e => {

    this.db.object(cat+"/"+key+"/pic1").update({[this.device.uuid+new Date().getTime()]:e});

  








})

this.photos=[];
  this.photos1=[];
loading.dismiss();
this.todo.controls['post'].setValue("");
this.presentToast("上传成功");
}





delete1(id:any,id1:any){

  if (this.network.type === 'none')
  {
   alert("网络无连接，请连接网络后再重试！");
   return;

 } 
  else{




   let loading = this.loadingCtrl.create({
   
  });
  loading.present();
  var cat="";

if(this.selectedSegment == '1')
{ cat = "rent";}
if(this.selectedSegment == "2")
{ cat = "life";}
if(this.selectedSegment == '3')
{ cat = "new";}
 
this.db.object(cat+"/"+id+"/comment/"+id1).remove().then(e=>{


loading.dismiss();

this.presentToast("删除成功");




});
var ifsub=true;
this.db.list("userProfile/").subscribe(e=>{

e.forEach(f=>{

this.db.list("userProfile/"+f.id+"/act").subscribe(q=>{
   q.forEach(x=>{
if(x.key2==cat+"/"+id+"/comment/"+id1){

   
this.db.object("userProfile/"+f.id+"/act/"+x.key3).remove();

this.db.object("userProfile/"+f.id).subscribe( e=>{


if(ifsub&& e.count>0)
{this.db.object("userProfile/"+f.id).update({count:e.count-1});
ifsub=false;
}



}



  



)

}





   })
  





})






})


})}
}
 






delete(id:any){


  if (this.network.type === 'none')
  {

    alert("网络无连接，请连接网络后再重试！");
    return;

 } 
  else{







   let loading = this.loadingCtrl.create({
   
  });





  loading.present();
  var cat="";

if(this.selectedSegment == '1')
{ cat = "rent";}
if(this.selectedSegment == "2")
{ cat = "life";}
if(this.selectedSegment == '3')
{ cat = "new";}
var a= ""

this.db.object(cat+"/"+id).remove();

this.db.list("userProfile/").subscribe(e=>{

e.forEach(f=>{

this.db.list("userProfile/"+f.id+"/act").subscribe(q=>{
   q.forEach(x=>{

if(x.key1==cat+"/"+id){

   
this.db.object("userProfile/"+f.id+"/act/"+x.key3).remove();
var ifsub=true;


}





   }) 
  




})






})


})




loading.dismiss();

this.presentToast("删除成功");


}

}
 


deletePhoto(index){
this.photos.splice(index,1);
this.photos1.splice(index,1);
}



public presentActionSheet() {

  if(this.photos.length==6)
{ this.presentToast("最多只能上传6张照片");}

else{
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
    actionSheet.present();}
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
  this.photos1.push(imageData);
  this.photos1.reverse();
 this.base64Image =  "data:image/jpeg;base64,"+ imageData;
 this.photos.push(this.base64Image);
 this.photos.reverse();
    
      
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
  this.photos1.push(imageData);
   this.photos1.reverse();
   this.base64Image =  "data:image/jpeg;base64,"+ imageData;
 this.photos.push(this.base64Image);
 this.photos.reverse();
    

    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });





}


private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 2000,
    position: 'top'
  });
  toast.present();
}

comment(pid:any,name:any,rrid:any){
 this.ifcanhide=true;
if(this.post==false)
{this.post=true;
}
var cat="";

if(this.selectedSegment == '1')
{ cat = "rent/";}
if(this.selectedSegment == "2")
{ cat = "life/";}
if(this.selectedSegment == '3')
{ cat = "new/";}
this.receiver=cat+pid+"/comment/";
this.path=cat+pid;
this.rn=name;
this.rid=rrid;
this.actid=pid;



}


gopocom(){
   this.pro.setid(this.myid);
  this.pro.load();

 let com = this.com.controls['comment'].value;
var wtw="";
if(this.rid==this.myid)
{
wtw=this.rn;

}

else
{

wtw=this.pro.name+"@"+this.rn;

}


var push=this.db.list(this.receiver).push({whotowho:wtw,text:com,ava:localStorage.getItem("ava"),senderid:this.myid,receiverid:this.rid,pn:localStorage.getItem("name")}).key;
this.db.object(this.receiver+"/"+push).update({pid:push});
this.post=false;
var bo=false;
if(this.rid!=this.myid)
{

var cat="";

if(this.selectedSegment == '1')
{ cat = "rent/";}
if(this.selectedSegment == "2")
{ cat = "life/";}
if(this.selectedSegment == '3')
{ cat = "new/";}



var pushid=this.db.list("userProfile/"+this.rid+"/act/").push({ key1:cat+this.actid,key2:this.receiver+push }).key;  
this.db.object("userProfile/"+this.rid+"/act/"+pushid).update({key3:pushid,key4:"userProfile/"+this.rid+"/act/"+pushid})


}


this.com.controls['comment'].setValue("");
this.presentToast("成功发表评论！");
}}
