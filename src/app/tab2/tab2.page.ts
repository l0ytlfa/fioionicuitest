/* eslint-disable max-len */
/* eslint-disable prefer-const */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { IonSlides , Animation, AnimationController, DomController, Gesture, GestureController, Platform } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements AfterViewInit{

  @ViewChild('pgs') slidesProducts: IonSlides;
  @ViewChild('cnt') content: any;
  @ViewChild('divcover') divcover: ElementRef;
  @ViewChild('VSE') VSE: CdkVirtualScrollViewport;


  public templString: string;
  headers: any[] = [];
  items: any[] = [];
  wdts: any[] = [];

  lastSelectd: any;
  lastSelectdIndex = 0;

  swiperInner: any;
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

  constructor(public photoService: PhotoService, private animationCtrl: AnimationController,private domCtrl: DomController,private renderer: Renderer2,
    private gestureCtrl: GestureController, private platform: Platform) {
    this.photoService = photoService;
    this.templString = photoService.getData();

    this.slideOpts = {
      slidesPerView: 3,
      freeMode: true
    };

    for(let idx=1;idx<200;idx++){
      var hdrdata = [];
      for(let idy=1;idy<10;idy++){
        hdrdata.push({r1:'title here! '+idy,r2:'sub title here',r3:'description is long thing'});
      }

      this.headers.push({hdr:'my header :'+idx,items: hdrdata});
      
    }

    for(let idx=1;idx<200;idx++){
      this.items.push({r1:'title here! '+idx,r2:'sub title here',r3:'description is long thing'});
    }

  }
  async ngAfterViewInit() {

    this.swiperInner = await this.slidesProducts.getSwiper();

    this.wdts.push(this.swiperInner.slides[0].children[0].getBoundingClientRect());
    this.wdts.push(this.swiperInner.slides[1].children[0].getBoundingClientRect());
    this.wdts.push(this.swiperInner.slides[2].children[0].getBoundingClientRect());
    this.wdts.push(this.swiperInner.slides[3].children[0].getBoundingClientRect());
    this.wdts.push(this.swiperInner.slides[4].children[0].getBoundingClientRect());

    this.swiperInner.on('setTranslate', (translate)=>{

      this.domCtrl.write(() => {
        this.renderer.setStyle(this.divcover.nativeElement, 'width', this.wdts[this.lastSelectdIndex].width+'px');

        if (this.swiperInner.translate === 0){
          this.animationCtrl.create()
          .addElement(this.divcover.nativeElement)
          .duration(250)
          .to('left',this.wdts[this.lastSelectdIndex].x+'px')
          .to('transform', 'translate3d('+this.swiperInner.translate+'px,0,0)')
          .play();
        }else{
          this.animationCtrl.create()
          .addElement(this.divcover.nativeElement)
          .to('left',this.wdts[this.lastSelectdIndex].x+'px')
          .to('transform', 'translate3d('+this.swiperInner.translate+'px,0,0)')
          .play();
        }

      });
    });
  }

  slidesDrag($event){
    //--> nothing
  }

  async clickFab($event){
    this.slidesProducts.slideTo(3);
    this.lastSelectdIndex = 2;

    this.renderer.setStyle(this.divcover.nativeElement, 'width', this.wdts[this.lastSelectdIndex].width+'px');

    this.animationCtrl.create()
      .addElement(this.divcover.nativeElement)
      .duration(300)
      .to('left',this.wdts[this.lastSelectdIndex].x+'px')
      .to('transform', 'translate3d('+this.swiperInner.translate+'px,0,0)')
      .play();
  }

  slidePress($event){

    this.lastSelectdIndex = this.swiperInner.clickedIndex;
    this.lastSelectd = $event.detail.target;
    this.renderer.setStyle(this.divcover.nativeElement, 'width', this.wdts[this.lastSelectdIndex].width+'px');

    this.animationCtrl.create()
      .addElement(this.divcover.nativeElement)
      .duration(200)
      .to('left',this.wdts[this.lastSelectdIndex].x+'px')
      .to('transform', 'translate3d('+this.swiperInner.translate+'px,0,0)')
      .play();
  }

  getBorderVal(){
    return '\''+this.borderVar+'\'';
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

