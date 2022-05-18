import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss','../../../node_modules/css-skeletons/css/css-skeletons.css']
})
export class Tab1Page implements AfterViewInit{

  @ViewChildren('player') videoPlayersList: QueryList<any>

  apiLoaded: boolean
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
  ngAfterViewInit(): void {

    //--> load youtube video API
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

  }

  videReady($event){
    $event.target.mute()
    $event.target.playVideo()
  }

  onScrollContent($event) {
    this.videoPlayersList.forEach((splay) => {
      if (this.isViewElementInViewPort(splay)) {
        splay.nativeElement.muted = true
        splay.nativeElement.play()
      } else {
        splay.nativeElement.pause()
      }
    })
  }

  isViewElementInViewPort(splay: any): boolean {
    const rect = splay.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  goFull(splayer){
    this.openFullscreen(splayer);
  }

  openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitEnterFullscreen) {
      elem.webkitEnterFullscreen();
      elem.enterFullscreen();
    }
  }

}
