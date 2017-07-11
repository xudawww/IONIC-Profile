import { Component,ViewChild,ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController,ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, Validators,FormGroup  } from '@angular/forms';
import {AutocompletePage} from './autocomplete';
declare var google;
@Component({
  selector: 'page-carpo',
  templateUrl: 'carpo.html'
})
export class CarpoPage {
@ViewChild('map') mapElement;
@ViewChild('address') places;
map:any;
 address;
autocomple:any;
private todo : FormGroup;
  constructor(public navCtrl: NavController,platform: Platform,public geolocation: Geolocation,private formBuilder: FormBuilder,private modalCtrl: ModalController) {

   this.address = {
      place: ''
    };
  
       
    }
ngOnInit(){
      this.todo = this.formBuilder.group({
      placeAutofill: ['', Validators.compose([Validators.required, ,Validators.maxLength(200)])],
   
    });
}

  ionViewDidEnter(){
 
  
    this.loadMap();
 

 
  }
 loadMap(){
  this.todo.controls["placeAutofill"].setValue("");
 this.geolocation.getCurrentPosition().then((position) => {
 var myIcon = new google.maps.MarkerImage("images/marker-icon.png", null, null, null, new google.maps.Size(21,30));
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        streetViewControl: false,
        panControl: false,
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     

      let marker = new google.maps.Marker({
    icon:"https://firebasestorage.googleapis.com/v0/b/second-abacus-154519.appspot.com/o/ic_person_pin_circle_black_24dp_2x.png?alt=media&token=db50cae4-3461-4c05-8aac-60ebde0961d7",
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });








    }, (err) => {
      console.log(err);
    });
 
 
 
}
  

 showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
      alert(data);
    });
    modal.present();
  }
clear(){
this.todo.controls["placeAutofill"].setValue("");


}



}
