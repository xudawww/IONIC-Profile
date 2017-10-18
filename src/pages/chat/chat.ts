import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public events: Events, public zone: NgZone) {
    
   
  }
 
  addmessage() {
   
  }
 
  ionViewDidEnter() {
    
  }
 
  scrollto() {
   
  }

}
