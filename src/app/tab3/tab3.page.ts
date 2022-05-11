import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { AnimationController, Gesture, GestureController } from '@ionic/angular';
import { myEnterAnimation } from './animation1';
import { myExitAnimation } from './animation2';
import { myEnterAnimationCenter } from './animation3';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {

  isModalOpen: boolean = false
  isModalOpen2: boolean = false;
  isModalOpen3: boolean = false;
  refPageEl: any
  myEnterAnimation: any
  myEnterAnimationCenter: any
  myExitAnimation: any

  @ViewChild('BTN1') btn1: any;
  @ViewChild('BTN1ICON') btn1Icon: any;

  constructor(private modalController: ModalController, private animationCtrl: AnimationController, private gestureCtrl: GestureController) {
    this.refPageEl = document.querySelector('.ion-page');

    this.myEnterAnimation = myEnterAnimation;  //<-- link to animation file
    this.myEnterAnimationCenter = myEnterAnimationCenter;  //<-- link to animation file
    this.myExitAnimation = myExitAnimation;
  }

  ngAfterViewInit() {

  }

  pressfab3(){
    this.isModalOpen3 = true;
  }

  pressfab() {
    let an1 = this.animationCtrl.create()
      .addElement(this.btn1.el)
      .duration(300).easing('ease-in-out')
      .to('transform', 'scale3d(45,45,1)');

    let an2 = this.animationCtrl.create()
      .addElement(this.btn1Icon.el)
      .duration(200)
      .to('opacity', '0%');

    this.animationCtrl.create()
      .addAnimation([an1, an2]).play();

    this.isModalOpen = true;
  }

  closefab() {
    this.isModalOpen = false;

    let an1 = this.animationCtrl.create()
      .addElement(this.btn1.el)
      .duration(200).easing('ease-in-out')
      .to('transform', 'scale3d(1,1,1)');

    let an2 = this.animationCtrl.create()
      .addElement(this.btn1Icon.el)
      .duration(1)
      .to('opacity', '100%');

    this.animationCtrl.create()
      .addAnimation([an1, an2]).play();

  }

  closefab2(){
    this.isModalOpen2 = false;
  }

  closefab3(){
    this.isModalOpen3 = false;
  }

  pressfab2() {
    this.isModalOpen2 = true;
  }

}
