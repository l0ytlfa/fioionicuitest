
//https://www.joshmorony.com/how-to-create-a-directive-in-ionic-2-parallax-header/
//https://www.joshmorony.com/using-a-directive-to-modify-the-behaviour-of-an-ionic-component/
//https://spicyyoghurt.com/tools/easing-functions

/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { AfterViewChecked, AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { AnimationController, Gesture, GestureController } from '@ionic/angular';

@Directive({
  selector: '[appParallaxFioritalHeader]'
})

export class ParallaxFioritalHeaderDirective implements AfterViewInit, AfterViewChecked {

  @Input() imageRef: any;
  @Input() headerRef: any;
  @Input() barSearchRef: any;
  @Input() fabRef: any;
  @Input() barRefBottom: any;
  @Input() VSE: any;
  @Input() spacer: any;
  @Input() content: any;
  @Input() draghdr: any;
  @Input() mover: any;
  @Input() moverBadge: any;

  dragInMover: boolean = false;
  imageHeight: number;
  headerHeight: number;
  ScrollDirection: string = '';
  lastScrollOffset: number = 0;
  startScrollPosition: number = 0;
  moverStartDragPos: number = 0;
  expandedHeader: boolean = false;
  private mainContent: HTMLDivElement;

  constructor(private element: ElementRef, private domCtrl: DomController, private animationCtrl: AnimationController, private gestureCtrl: GestureController,
    private renderer: Renderer2) {
    console.log('Hello Overslide Directive');
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(ev: any) {

  }

  _animateOnScroll(scrollTop) {
    let imageMoveUp;
    let imagescaleDown;
    let imageOpacity;
    let barOpacity;
    let floatButtonMoveUp;
    let masterHeaderOpacity;
    let bottomBarOpacity;
    let spacerPosition;
    let moveWidth;
    let bagseMoverOpacity;

    if (scrollTop >= 0) {
      imageMoveUp = -this.easeLinear(scrollTop, 0, this.imageHeight / 3.5, 300);
      imagescaleDown = this.easeLinear(scrollTop, 1, 0.7, 300);
      imageOpacity = this.easeLinear(scrollTop, 100, 0, 200);
      floatButtonMoveUp = this.easeLinear(scrollTop, 7.8, 5, 300);
      barOpacity = this.easeLinear(scrollTop, 0, 100, 400, 300);
      masterHeaderOpacity = this.easeLinear(scrollTop, 0, 100, 250, 180);
      bottomBarOpacity = this.easeLinear(scrollTop, 0, 85, 400, 300);

      moveWidth = this.easeLinear(scrollTop, 0, 7.5, 400, 300);
      bagseMoverOpacity = this.easeLinear(scrollTop, 0, 100, 400, 300);
      
    } else {
      imageMoveUp = this.easeLinear(-scrollTop, 0, this.imageHeight, 300);
      imagescaleDown = this.easeLinear(-scrollTop, 1, 2.5, 300);
      imageOpacity = 100;
      barOpacity = 0;
      moveWidth = 0;
      bottomBarOpacity = 0;
      bagseMoverOpacity = 0;
      floatButtonMoveUp = this.easeLinear(-scrollTop, 7.8, 22.0, 300);
    }

    //---> patch DOM
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.spacer, 'margin-bottom', spacerPosition + 'em');

      this.renderer.setStyle(this.imageRef.el, 'transform', 'translate3d(0,' + imageMoveUp + 'px,0)  scale3d(' + imagescaleDown + ',' + imagescaleDown + ',1)');

      this.renderer.setStyle(this.imageRef.el, 'opacity', imageOpacity + '%');
      this.renderer.setStyle(this.headerRef.el, 'opacity', masterHeaderOpacity + '%');
      this.renderer.setStyle(this.barRefBottom.el, 'opacity', bottomBarOpacity + '%');

      this.renderer.setStyle(this.barSearchRef.el, 'opacity', barOpacity + '%');
      this.renderer.setStyle(this.fabRef.el, 'top', floatButtonMoveUp + 'em');

      this.renderer.setStyle(this.mover, 'width', moveWidth + '%');
      this.renderer.setStyle(this.moverBadge.el, 'opacity', bagseMoverOpacity + '%');


      if (this.ScrollDirection === 'U' && this.startScrollPosition === 0) {

        let an1 = this.animationCtrl.create()
          .addElement(this.spacer)
          .to('height', '10em')
          .duration(200);

        let an2 = this.animationCtrl.create()
          .addElement(this.draghdr.el)
          .to('opacity', '100%')
          .duration(100);

        let an3 = this.animationCtrl.create()
          .addElement(this.imageRef.el)
          .to('top', '4em')
          .duration(100);

        this.animationCtrl.create()
          .addAnimation([an1, an2, an3]).play();

        this.expandedHeader = true;
      } else if (this.ScrollDirection === 'D') {

        let an4 = this.animationCtrl.create()
          .addElement(this.spacer)
          .duration(200)
          .to('height', '7.5em');

        let an5 = this.animationCtrl.create()
          .addElement(this.imageRef.el)
          .to('top', '2em')
          .duration(100);

        let an6 = this.animationCtrl.create()
          .addElement(this.draghdr.el)
          .to('opacity', '0%')
          .duration(50);

        this.animationCtrl.create()
          .addAnimation([an4, an5, an6]).play();

        this.expandedHeader = false;

      }

    });


  }

  easeLinear(actualTime, originalValue, targetValue, totalTime, initialCutoff = 0) {

    if (actualTime < initialCutoff) {
      return originalValue;
    }

    //--> internal shift values
    const internalActualTime = actualTime - initialCutoff;
    const internalTotalTime = totalTime - initialCutoff;

    if (actualTime > totalTime) {
      return targetValue;
    }

    const c: number = targetValue - originalValue;
    return (c * internalActualTime / internalTotalTime + originalValue).toFixed(2);
  }


  ngAfterViewChecked() {

    //--> get original heights
    if (this.imageHeight === undefined || this.imageHeight === 0) {
      this.imageHeight = this.imageRef.el.offsetHeight;
    }

  }

  ngAfterViewInit() {

    this.mainContent = this.element.nativeElement.querySelector('.main-content');

    //--> drag (over scroll) event tracker
    this.gestureCtrl.create({
      el: this.content.el,
      threshold: 15,
      gestureName: 'my-gesture',
      notCaptured: ev => {

        if (ev.deltaY < 0) {
          this.ScrollDirection = 'D';
        } else {
          this.ScrollDirection = 'U';
        }

        this.startScrollPosition = this.VSE.measureScrollOffset();
        console.log(this.startScrollPosition)
      }
    }, true).enable();

    //---> mover list element drag (y)
    this.gestureCtrl.create({
      el: this.mover,
      threshold: 15,
      gestureName: 'mover',
      onEnd: ev => {
        this.dragInMover = false;
        this.domCtrl.write(()=>{
          this.renderer.setStyle( this.moverBadge.el, 'visibility','hidden');
        });
      },
      onStart: ev => {
        this.dragInMover = true;
        this.domCtrl.read(() => {
          this.moverStartDragPos = this.mover.getBoundingClientRect().y;
        })

        this.domCtrl.write(()=>{
          this.renderer.setStyle( this.moverBadge.el, 'visibility','initial');
        });
      },
      onMove: ev => {
        var topPos = this.moverStartDragPos + ev.deltaY
        if (topPos < 200) {
          topPos = 200;
        }
        if (topPos > 700) {
          topPos = 700;
        }

        let elCount = this.VSE.getDataLength();
        let perc = (topPos - 200) / (700 - 200);
        let elIdx = Math.ceil(elCount * perc)
        if (elIdx < 6) {
          elIdx = 6
        }

        this.domCtrl.write(() => {
          this.renderer.setStyle(this.mover, 'top', topPos + 'px');
          this.VSE.scrollToIndex(elIdx)
        })
      },
      disableScroll: true,
      direction: 'y',
      gesturePriority: 100
    }, true).enable();

    this.VSE.scrolledIndexChange.subscribe(function ($event) {

      this.domCtrl.write(() => {
        this.moverBadge.el.innerHTML = 'in index '+$event;
      });

      if (this.dragInMover === false) {


        let elCount = this.VSE.getDataLength();
        let perc = $event / elCount
        let topPos = Math.floor(200+((700 - 200) * perc));

        this.domCtrl.write(() => {
          this.renderer.setStyle(this.mover, 'top', topPos + 'px');
        })
      }
    }.bind(this))

    this.VSE.elementScrolled()
      .subscribe(function (event) {
        this._animateOnScroll(this.VSE.measureScrollOffset());
        this.lastScrollOffset = this.VSE.measureScrollOffset();
      }.bind(this));
  }
}
