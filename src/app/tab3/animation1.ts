
import { Animation } from '@ionic/angular';
import { createAnimation } from '@ionic/angular'

export function myEnterAnimation(
    baseEl: HTMLElement,
    options: any
): Animation {

    const baseAnimation = createAnimation('baseAnimation')

    const popAnimation = createAnimation('baseAnimation')
    const titleAnimation = createAnimation('baseAnimation')

    const mw = baseEl.shadowRoot.querySelector('.modal-wrapper')
    const title = baseEl.querySelector('ion-title')

    popAnimation
        .addElement(mw)
        .duration(400)
        .easing('cubic-bezier(.56,.09,.36,1.45)')
        .fromTo('transform', 'translate3d(0, 100%, 0)', 'translate3d(0, 0, 0)')
        .fromTo('opacity', 0, 1)

    titleAnimation
        .addElement(title)
        .duration(400)
        .fromTo('opacity', 0, 1);

    baseAnimation.addAnimation([popAnimation, titleAnimation])

    return baseAnimation

}