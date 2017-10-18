import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import {Auth} from '../../providers/auth';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public registerForm:any;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      fullname: ['', Validators.compose([ Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }
takephoto(){






      
}

  doRegister(){
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password).then( authService => {

       window.localStorage.setItem('user',authService.uid);
       this.authService.update(authService.uid,this.registerForm.value.email,"data:image/png;base64,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",this.registerForm.value.fullname)
     
   
       this.navCtrl.push(TabsPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: "注册失败,邮箱可能已经存在。请勿使用登陆过的facebook所绑定的邮箱。",
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      
    }
  }

}