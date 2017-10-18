import { Component } from '@angular/core';
import { NavController,ToastController} from 'ionic-angular';
import  firebase1 from 'firebase';
import {Pipe,PipeTransform} from '@angular/core';
import {PostPage} from '../post/post';
import { AngularFireDatabase,FirebaseListObservable,FirebaseObjectObservable  } from 'angularfire2/database';
import { FormBuilder, Validators,FormGroup  } from '@angular/forms';
import {Profile} from '../../providers/profile';
import 'rxjs/Rx';
@Pipe({
  name: 'objectValues1'
})

export class ObjectValues1Pipe implements PipeTransform {
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
  selector: 'page-act',
  templateUrl: 'act.html'
})
export class ActPage {
public myid;
public compath1;
public showup;
public rn;
public rid;
public actid;
private com : FormGroup;
public ifshow;
public post:boolean;
public compath:any;
public data1:FirebaseObjectObservable<any>;
public data:FirebaseObjectObservable<any>;
public data2:FirebaseObjectObservable<any>;
public data3:FirebaseObjectObservable<any>;

public po:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController,public pro:Profile,public toastCtrl: ToastController,public formBuilder:FormBuilder,public db:AngularFireDatabase) {
this.post=false;
const id = localStorage.getItem('user');
this.myid=id;
this.showup=false





  }
  ngOnInit(){
this.com =this.formBuilder.group({
      comment: ['', Validators.compose([Validators.required, ,Validators.maxLength(200)])],
   
    });


    this.po= this.db.list("/userProfile/"+this.myid+'/act', { query: {
      limitToFirst:1,
     preserveSnapshot: true
    } });
  
     
      this.po.subscribe(snapshots =>{
  
        snapshots.forEach(snapshot => {
          this.compath1=snapshot.key1;
             this.compath=snapshot.key1+"/comment"
             this.data=this.db.object(snapshot.key1);
             this.data1=this.db.object(snapshot.key2);
            this.showup=true;
  
         });
       
  
  
      })

    
  }
ionViewDidLeave(){

var ifwork=true
this.po.subscribe(e=>{
  e.forEach(o=>{
   if(ifwork) 
{
  ifwork=false;
  
this.db.object(o.key4).remove();

return;}
  })






})  



}

  ionViewDidEnter(){


if(this.data!=undefined)
  {
    this.ifshow=true;
  }
  else{
this.ifshow=false;

  }
  }
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 2000,
    position: 'top'
  });
  toast.present();
}
delete(){

  var key1;
 var ifwork=true
this.po.subscribe(e=>{
  e.forEach(o=>{
   if(ifwork) 
{
  ifwork=false;
  key1=o.key1
this.db.object(o.key1).remove();
this.db.object(o.key4).remove();
return;}
  })

this.db.list("userProfile").subscribe(e=>{

e.forEach(d=>{
  this.db.list("userProfile/"+d.id+"/act/").subscribe(a=>{
a.forEach(t=>{
  if(t.key1==key1)
  {
    this.db.object(t.key4).remove();

  }
})




  })


})




})




})
this.presentToast("删除成功");
this.navCtrl.pop();

}
delete1(){
 

 var ifwork=true
this.po.subscribe(e=>{
  e.forEach(o=>{
   if(ifwork) 
{
  ifwork=false;
  
this.db.object(o.key2).remove();
this.db.object(o.key4).remove();
return;}
  })






})  
this.presentToast("删除成功");
this.navCtrl.pop();
}



comment(){
  
if(this.post==false)
{this.post=true;
}

this.data.subscribe(e=>{
this.actid=e.pid;







});
this.data1.subscribe(e=>{
this.rid=e.senderid;
this.rn=e.pn;

 




});



}


gopocom(){

this.pro.setid(this.myid);
  this.pro.load();

 let com = this.com.controls['comment'].value;



var push=this.db.list(this.compath).push({whotowho:this.pro.name+"@"+this.rn,text:com,ava:this.pro.pic,senderid:this.myid,receiverid:this.rid,pn:this.pro.name}).key;
this.db.object(this.compath+"/"+push).update({pid:push});
this.post=false;
var bo=false;





var pushid=this.db.list("userProfile/"+this.rid+"/act/").push({ key1:this.compath1,key2:this.compath+"/"+push }).key;  
this.db.object("userProfile/"+this.rid+"/act/"+pushid).update({key3:pushid,key4:"userProfile/"+this.rid+"/act/"+pushid})





this.com.controls['comment'].setValue("");
this.presentToast("成功发表评论！");


var ifwork=true


this.navCtrl.pop();
}

}
 