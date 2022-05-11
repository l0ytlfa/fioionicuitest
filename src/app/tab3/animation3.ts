
import { Animation } from '@ionic/angular';
import { createAnimation } from '@ionic/angular'

export function myEnterAnimationCenter(
    baseEl: HTMLElement,
    options: any
): Animation {

    const baseAnimation = createAnimation('baseAnimation')

    const popAnimation = createAnimation('baseAnimation')
    const titleAnimation = createAnimation('baseAnimation')

    const mw = baseEl.shadowRoot.querySelector('.modal-wrapper')
    const title = baseEl.querySelector('ion-title')

    popAnimation
        .beforeStyles({transform:'translate3d(0, 0, 0)',"border-radius":'2em'})
        .addElement(mw)
        .duration(300)
        .easing('cubic-bezier(.56,.09,.36,1.45)')
        .fromTo('transform', 'scale(0)', 'scale(1)')
        .fromTo('opacity', 0, 1)

    titleAnimation
        .addElement(title)
        .duration(400)
        .fromTo('opacity', 0, 1);

    baseAnimation.addAnimation([popAnimation, titleAnimation])
    
    return baseAnimation

}