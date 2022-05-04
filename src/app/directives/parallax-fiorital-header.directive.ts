
//https://www.joshmorony.com/how-to-create-a-directive-in-ionic-2-parallax-header/
//https://www.joshmorony.com/using-a-directive-to-modify-the-behaviour-of-an-ionic-component/
//https://spicyyoghurt.com/tools/easing-functions

/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import { DomController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Directive({
  selector: '[appParallaxFioritalHeader]'
})

export class ParallaxFioritalHeaderDirective implements AfterViewInit, AfterViewChecked {

  @Input() imageRef: any;
  @Input() headerRef: any;
  @Input() barSearchRef: any;
  @Input() fabRef: any;
  @Input() barRefBottom: any;
  
  imageHeight: number;
  headerHeight: number;
  private mainContent: HTMLDivElement;

  constructor(private element: ElementRef ,private domCtrl: DomController, private animationCtrl: AnimationController,
    private renderer: Renderer2)
  {
    console.log('Hello Overslide Directive');
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(ev: any) {

      let imageMoveUp;
      let imagescaleDown;
      let imageOpacity;
      let barOpacity;
      let floatButtonMoveUp;
      let masterHeaderOpacity;
      let bottomBarOpacity;

      if(ev.detail.scrollTop >= 0){
         imageMoveUp = -this.easeLinear(ev.detail.scrollTop,0,this.imageHeight/3.5,300);
         imagescaleDown = this.easeLinear(ev.detail.scrollTop,1,0.7,300);
         imageOpacity = this.easeLinear(ev.detail.scrollTop,100,0,200);
         floatButtonMoveUp = this.easeLinear(ev.detail.scrollTop,7.8,5,300);
         barOpacity = this.easeLinear(ev.detail.scrollTop,0,100,400,300);
         masterHeaderOpacity = this.easeLinear(ev.detail.scrollTop,0,100,250,180);
         bottomBarOpacity = this.easeLinear(ev.detail.scrollTop,0,100,400,300);
      } else {
        imageMoveUp = this.easeLinear(-ev.detail.scrollTop,0,this.imageHeight,300);
        imagescaleDown = this.easeLinear(-ev.detail.scrollTop,1,2.5,300);
        imageOpacity = 100;
        barOpacity = 0;
        bottomBarOpacity = 0;
        floatButtonMoveUp = this.easeLinear(-ev.detail.scrollTop,7.8,22.0,300);
      }

      //---> patch DOM
      this.domCtrl.write(() => {
        this.renderer.setStyle(this.imageRef.el, 'transform', 'translate3d(0,'+imageMoveUp+'px,0)  scale('+imagescaleDown+','+imagescaleDown+')');
        
        this.renderer.setStyle(this.imageRef.el, 'opacity', imageOpacity+'%');
        this.renderer.setStyle(this.headerRef.el, 'opacity', masterHeaderOpacity+'%');
        this.renderer.setStyle(this.barRefBottom.el, 'opacity', bottomBarOpacity+'%');

        this.renderer.setStyle(this.barSearchRef.el, 'opacity', barOpacity+'%');
        this.renderer.setStyle(this.fabRef.el, 'top', floatButtonMoveUp+'em');
      });

  }

  easeLinear(actualTime, originalValue, targetValue, totalTime, initialCutoff = 0) {

    if (actualTime < initialCutoff){
      return originalValue;
    }

    //--> internal shift values
    const internalActualTime = actualTime - initialCutoff;
    const internalTotalTime = totalTime - initialCutoff;

    if (actualTime > totalTime){
      return targetValue;
    }
    
    const c: number = targetValue - originalValue;
    return (c * internalActualTime / internalTotalTime + originalValue).toFixed(2);
  }


  ngAfterViewChecked(){

    //--> get original heights
    if (this.imageHeight === undefined || this.imageHeight === 0){
      this.imageHeight = this.imageRef.el.offsetHeight;
    }    

  }

  ngAfterViewInit(){
    this.mainContent = this.element.nativeElement.querySelector('.main-content');
  }
}
