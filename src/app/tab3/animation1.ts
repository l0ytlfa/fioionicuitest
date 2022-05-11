
import { AnimationController,Animation, Gesture, GestureController } from '@ionic/angular';
import { createAnimation } from '@ionic/angular'

export function myEnterAnimation(
    baseEl: HTMLElement,
    options: any
): Animation {
    
    const baseAnimation = createAnimation('baseAnimation')
    
    const mw = baseEl.shadowRoot.querySelector('.modal-wrapper')
    baseAnimation
        .addElement(mw)
        .duration(400)
        .easing('cubic-bezier(.56,.09,.36,1.45)')
        .fromTo('transform', 'translate3d(0, 100%, 0)', 'translate3d(0, 0, 0)')
        .fromTo('opacity', 1, 1);
    
    return baseAnimation
      
}