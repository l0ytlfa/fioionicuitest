import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slideOpts: any;
  slideOpts2: any;
  imagSource: string = '../../assets/menusanvan.png'

  public templString: string;

  constructor(public photoService: PhotoService) {
    
    this.photoService = photoService;
    
    this.slideOpts = {
      freeMode: false,
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 10
    };

    this.slideOpts2 = {
      freeMode: true, //<-- free mode
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 10
    };
  }

}
