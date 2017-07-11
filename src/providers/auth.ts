import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import firebase1 from 'firebase';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

/*import * as firebase from 'firebase/app';
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {
  items:any;
 

  id:number=1682904092011248;
  facebook:any;
  constructor(public http: Http,public afAuth: AngularFireAuth,public fb:Facebook,public db: AngularFireDatabase) {
    
    console.log('Hello Auth Provider');
    
  }
login(newEmail: any, newPassword: any): any {
  return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  
}
resetPassword(email: string): any {
  return this.afAuth.auth.sendPasswordResetEmail(email);
}

  logout() {
    this.afAuth.auth.signOut();
  }




register(email: string, password: string): any {
  return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
   
}

update(id:string,email:string,pic:string,name:string){
  

 const db1=this.db.object("/userProfile/"+id);
 db1.set({email:email,pic:pic,status:"请用一句话描述自己",pro:"未知",camp:"未知",sex:"none",name:name});
  


}

update1(id:string,email:string,pic:string,name:string){
  const check= firebase1.database().ref("userProfile/").child(id+"/reg").on('value' ,value=>{
     if(value.val()!="yes")
   {   const db1=this.db.object("/userProfile/"+id);
 db1.set({email:email,pic:pic,status:"facebook绑定账户",pro:"未知",camp:"未知",sex:"none",name:name,reg:"yes"});
     }

  })


  


}





}



