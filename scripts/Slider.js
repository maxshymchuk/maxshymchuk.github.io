import { Animation } from './Animation.js';
import { Canvas } from "./Canvas.js";
import CONSTS from "./consts.js";

export class Slider {
  constructor(slides, templateId, slider) {
    this._template = document.getElementById(templateId);
    this._slides = slides;
    this._slider = slider;
    this._pos = 0;
    this._canvas = new Canvas('triangles');
    this._count = 3;
    this.animation = new Animation(this._slider);

    this.#render();

    this.slideChangingEvent = new Event('slideChanging');
    this.slideChangedEvent = new Event('slideChanged');
  }

  set count(number) {
    if (number <= 0) return;
    this._count = number;
  }

  get slides() {
    const slides = [];
    for (let i = 0; i < this._count; i++) {
      slides.push(this._slides[this.#getSlide(this._pos - Math.trunc(this._count / 2) + i)])
    }
    return slides;
  }

  #getSlide(pos) {
    return (this._slides.length + pos) % this._slides.length;
  }

  #renderLanguages(target, languages) {
    if (languages.length > 0) {
      target.innerText = languages.join(' ');
    } else {
      target.remove();
    }
  }

  #renderContributors(target, contributes) {
    contributes.forEach(contributor => {
      const contributorDOM = document.getElementById('template__contributor').content.cloneNode(true);
      const link = contributorDOM.querySelector('.contributor');
      const img = contributorDOM.querySelector('img');
      link.href = contributor.url;
      link.setAttribute('target', '_blank');
      img.src = contributor.avatar;
      img.setAttribute('title', contributor.login);
      target.append(contributorDOM)
    })
  }

  #renderButtons(target, links) {
    const LINK_TYPE = {
      REPO: 0,
      SITE: 1
    }
    links.forEach((link, i) => {
      if (link) {
        const buttonDOM = document.getElementById('template__button').content.cloneNode(true);
        const button = buttonDOM.querySelector('.button');
        button.href = link;
        button.setAttribute('target', '_blank');
        button.innerText = i === LINK_TYPE.SITE ? 'WEBSITE' : 'REPO';
        target.append(button)
      }
    })
  }

  #render() {
    const fragment = document.createDocumentFragment();
    this.slides.forEach(slide => {
      const projectDOM = this._template.content.cloneNode(true).querySelector('.content');
      const project = {
        title: projectDOM.querySelector('.title'),
        description: projectDOM.querySelector('.description'),
        languages: projectDOM.querySelector('.languages'),
        contributors: projectDOM.querySelector('.contributors'),
        buttons: projectDOM.querySelector('.buttons')
      };
      project.title.innerText = slide.name;
      project.description.innerText = slide.description;
      this.#renderLanguages(project.languages, slide.languages);
      this.#renderContributors(project.contributors, slide.contributors);
      this.#renderButtons(project.buttons, [slide.page, slide.site]);
      fragment.append(projectDOM);
    })
    this._slider.innerHTML = '';
    this._slider.append(fragment);
  }

  #onSlideChanging() {
    window.dispatchEvent(this.slideChangingEvent);
  }

  #onSlideChanged() {
    window.dispatchEvent(this.slideChangedEvent);
    this.#render();
  }

  next() {
    this.#onSlideChanging();
    this._pos = this.#getSlide(++this._pos);
    this.animation.run(
      {
        initial: {
          transform: `translate(${CONSTS.CENTER_SLIDE_POS})`
        },
        becoming: {
          transform: `translate(${CONSTS.RIGHT_SLIDE_POS})`
        }
      },
      null,
      this.#onSlideChanged.bind(this)
    )
  }

  prev() {
    this.#onSlideChanging();
    this._pos = this.#getSlide(--this._pos);
    this.animation.run(
      {
        initial: {
          transform: `translate(${CONSTS.CENTER_SLIDE_POS})`
        },
        becoming: {
          transform: `translate(${CONSTS.LEFT_SLIDE_POS})`
        }
      },
      null,
      this.#onSlideChanged.bind(this)
    )
  }
}