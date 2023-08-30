import CustomAnimation from './CustomAnimation.js';
import Canvas from './Canvas.js';
import CONSTS, { API } from '../consts.js';

function formatDate(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Intl.DateTimeFormat(undefined, options).format(date);
}

function formatLanguage(language) {
    const replacer = [{ from: '#', to: 'sharp' }];
    let string = language.toLowerCase();
    replacer.forEach(replacement => string = string.replaceAll(replacement.from, replacement.to));
    return string;
}

export default class Slider {
    constructor(slides, slideTemplate, slider) {
        this._template = slideTemplate;
        this._slides = slides;
        this._slider = slider;
        this._pos = 0;
        this._count = 3;
        this._canvas = new Canvas('triangles');
        this._animation = new CustomAnimation(this._slider);

        this.#render();

        this.slideChangingEvent = new Event('slideChanging');
        this.slideChangedEvent = new Event('slideChanged');
    }

    get slides() {
        const slides = [];
        for (let i = 0; i < this._count; i++) {
            slides.push(this._slides[this.#getSlide(this._pos - Math.trunc(this._count / 2) + i)]);
        }
        return slides;
    }

    next() {
        this.#onSlideChanging();
        this._animation.run(
            {
                initial: {
                    transform: `translate(${CONSTS.CENTER_SLIDE_POS})`
                },
                becoming: {
                    transform: `translate(${CONSTS.RIGHT_SLIDE_POS})`
                }
            },
            null,
            () => {
                this._pos = this.#getSlide(++this._pos);
                this.#onSlideChanged();
            }
        );
    }

    prev() {
        this.#onSlideChanging();
        this._animation.run(
            {
                initial: {
                    transform: `translate(${CONSTS.CENTER_SLIDE_POS})`
                },
                becoming: {
                    transform: `translate(${CONSTS.LEFT_SLIDE_POS})`
                }
            },
            null,
            () => {
                this._pos = this.#getSlide(--this._pos);
                this.#onSlideChanged();
            }
        );
    }

    #getSlide(pos) {
        return (this._slides.length + pos) % this._slides.length;
    }

    #renderText(target, text) {
        if (text && text.length > 0) {
            target.innerText = text;
        } else {
            target.remove();
        }
    }

    #renderLanguages(target, languages) {
        if (languages && languages.length > 0) {
            target.innerHTML = languages
                .map(lang => `<img src='${API.getLogoByLanguage(formatLanguage(lang))}' alt='${lang}' title='${lang}' />`)
                .join('');
        } else {
            target.remove();
        }
    }

    #renderContributors(target, contributors) {
        if (contributors && contributors.length > 0) {
            contributors.forEach(contributor => {
                const contributorDOM = document.getElementById('template__contributor').content.cloneNode(true);
                const link = contributorDOM.querySelector('.contributor');
                const img = contributorDOM.querySelector('img');
                link.href = contributor.html_url;
                link.setAttribute('target', '_blank');
                img.src = contributor.avatar_url;
                img.setAttribute('title', contributor.login);
                target.append(contributorDOM);
            });
        } else {
            target.remove();
        }
    }

    #renderButtons(target, links) {
        if (links && links.length > 0) {
            links.forEach((link, i) => {
                const buttonDOM = document.getElementById('template__button').content.cloneNode(true);
                const button = buttonDOM.querySelector('.button');
                button.href = link;
                button.setAttribute('target', '_blank');
                button.innerText = i === 0 ? 'GITHUB' : 'WEBSITE';
                target.append(button);
            });
        } else {
            target.remove();
        }
    }

    #render() {
        const fragment = document.createDocumentFragment();
        this.slides.forEach(slide => {
            const projectDOM = this._template.content.cloneNode(true).querySelector('.slide');
            const project = {
                updatedAt: projectDOM.querySelector('.updated-at'),
                title: projectDOM.querySelector('.title'),
                description: projectDOM.querySelector('.description'),
                languages: projectDOM.querySelector('.languages'),
                contributors: projectDOM.querySelector('.contributors'),
                buttons: projectDOM.querySelector('.buttons')
            };
            this.#renderText(project.title, slide.name);
            this.#renderText(project.description, slide.description);
            this.#renderText(project.updatedAt, formatDate(slide.updatedAt));
            this.#renderLanguages(project.languages, slide.languages);
            this.#renderContributors(project.contributors, slide.contributors);
            this.#renderButtons(project.buttons, [slide.page, slide.site]);
            fragment.append(projectDOM);
        });
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
}