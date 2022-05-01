import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public templString: string;
  items: any[] = [];
  slideOpts: any;
  borderVar = '5px solid green';
  width = '50%';
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
  rotateImg = 0;
  images = [
    'bandit',
    'batmobile',
    'blues-brothers',
    'bueller',
    'delorean',
    'eleanor',
    'general-lee',
    'ghostbusters',
    'knight-rider',
    'mirth-mobile'
  ];

  constructor(public photoService: PhotoService) {
    this.photoService = photoService;
    this.templString = photoService.getData();

    this.slideOpts = {
      slidesPerView: 3,
      freeMode: true,
      coverflowEffect: {
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }
    };
  }


  getBorderVal(){
    return '\''+this.borderVar+'\'';
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getImgSrc() {
    const src = 'https://dummyimage.com/600x400/${Math.round( Math.random() * 99999)}/fff.png';
    this.rotateImg++;
    if (this.rotateImg === this.images.length) {
      this.rotateImg = 0;
    }
    return src;
  }

  addPhotoToGallery() {
    this.photoService.setData('event!');
  }

}

