import { place, shuffle } from '../utils.js';
import BaseElement from './BaseElement.js';

function createHashtable(projects) {
    const map = new Map();
    for (const project of projects) {
        const element = new BaseElement(project.id, project.x, project.y);
        map.set(project.id, element);
    }
    return map;
}

export default class Collection {
    constructor(id, projects) {
        this._element = document.getElementById(id);
        this._elements = createHashtable(place(shuffle(projects)));
    }

    renderAll() {
        const elements = this._elements.values();
        for (const element of elements) element.render(this._element);
    }

    unrenderAll() {
        const elements = this._elements.values();
        for (const element of elements) element.unrender();
    }

    render(id) {
        const element = this._elements.get(id);
        element.render(this._element);
    }

    unrender(id) {
        const element = this._elements.get(id);
        element.unrender();
    }
}