import CONSTS from './consts.js';

export class CustomAnimation {
  constructor(handler) {
    this.handler = handler;
    this.animation = undefined;
  }

  run(animationRules, customSettings, callback) {
    const settings = {
      transitionTime: CONSTS.TRANSITION_TIME,
      easing: 'ease-in-out',
      iterations: 1,
      fill: 'none',
      ...customSettings
    }
    if (!this.animation) {
      this.animation = this.handler.animate([
        { ...animationRules.initial },
        { ...animationRules.becoming }
      ], {
        duration: settings.transitionTime,
        easing: settings.easing,
        iterations: settings.iterations,
        fill: settings.fill
      });
      this.animation.onfinish = () => {
        this.animation = undefined;
        callback && callback();
      }
    }
  }
}