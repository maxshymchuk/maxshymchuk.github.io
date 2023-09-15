function createElement(id, x, y) {
    const circleTemplate = document.getElementById('template-circle');
    const fragment = document.createDocumentFragment();
    const circleNode = circleTemplate.content.cloneNode(true).querySelector('.circle');
    circleNode.style.left = `calc(${x} * var(--unit) + 50%)`;
    circleNode.style.top = `calc(${y} * var(--unit) + 50%)`;
    circleNode.innerText = id;
    circleNode.dataset.id = id;
    fragment.append(circleNode);
    return fragment;
}

export default class BaseElement {
    constructor(id, x, y) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._element = createElement(this._id, this._x, this._y);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get coords() {}

    set coords(value) {}

    render(parent) {
        parent.append(this._element);
    }

    unrender() {
        this._element.remove();
    }
}