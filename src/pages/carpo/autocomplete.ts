import { Component,ViewChild,ElementRef,NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController,ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FormBuilder, Validators,FormGroup  } from '@angular/forms';
declare var google;
@Component({

  templateUrl: 'autocomplete.html'
})
export class AutocompletePage {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();
 
  constructor (public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'CA'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
       if(status=="OK")
        {{predictions.forEach(prediction=> {
          me.autocompleteItems.push(prediction.description);
        });
        




        }}
      });
    });
  }
}