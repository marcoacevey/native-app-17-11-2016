import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera } from 'ionic-native';
import { NavController, AlertController } from 'ionic-angular';

// pkuo4591

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;

  constructor(public navCtrl: NavController, public domSanitizer: DomSanitizer, public alertCtrl: AlertController) {

  }

  selectFromGallery() {
    let options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI
    };

    Camera
      .getPicture(options)
      .then((imageData) => {
        this.cameraUrl = imageData;
        this.photoSelected = true;
        this.photoTaken = false;
      }, (error) => {
        this.showAlert("Erro:", "Não foi possível abrir a câmer;", ['ok']);
      });
  }


  openCamera() {
    let options = {
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.DATA_URL
    }

    Camera
      .getPicture(options)
      .then((imageData) => {
        this.cameraData = 'data:image/jpeg;base64,' + imageData;
        this.photoTaken = true;
        this.photoSelected = false;
      })
      .catch((error) => {
        this.showAlert("Erro:", "Não foi possível acessar a galeria de images;", ['ok']);
      });
  }

  showAlert(title: string, message: string, buttons: Array<string>) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: buttons
    });

    alert.present();
  }
}
