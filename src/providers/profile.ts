import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import  firebase1 from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class Profile {
  id:any;
   items:any;
  public name:any;
  public pic:any;
  public sta:any;
  public sex:any;
  constructor(public http: Http,public db: AngularFireDatabase) {
    
    console.log('Hello W Provider');
  }
  
 setid(id:any){

   this.id=id;
 }

load(){
const id2= window.localStorage.getItem('user');


this.db.object("/userProfile/"+id2,{ preserveSnapshot: true}).subscribe(snapshot =>{
 
snapshot.forEach(element => {
  if(element.key=="name")
  {
      this.name= element.val();
    
  }
  if (element.key=="pic")
  {
    this.pic=element.val();

  }
  if( element.key=="status"   ){
    
   this.sta=element.val();
  }
    if( element.key=="sex"   ){

   this.sex=element.val();
  }

});


})

}

update(name:any,pic:any,sta:any,sex:any){
 
const id =localStorage.getItem('user');
 this.db.object("/userProfile/"+id).update({name:name,pic:pic,status:sta,sex:sex});
}


uploadimage() {}

}
