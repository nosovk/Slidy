import * as easing from './build/easing.js';

export function moving(e) {
    position = e.position;
    options.index = e.index;
    stats.innerHTML = `[<b>${options.index}</b>] / <b>${Math.trunc(position)}</b>px`;

    node.childNodes.forEach((n, i) =>
        +n.id === e.index ? n.classList.add('active') : n.classList.remove('active')
    );
    thumbs.childNodes.forEach((t, i) =>
        +t.id === e.index ? t.classList.add('active') : t.classList.remove('active')
    );
    dots.childNodes.forEach((d, i) =>
        i === e.index ? d.classList.add('active') : d.classList.remove('active')
    );
}
export function indexing(x) {
    if (!changing) {
        document.querySelector('input[name=index]').value = x;
    }
    slidyT.to(x);
}

export function changeValue(target, options) {
    const value = isNum(target.value)
        ? +target.value
        : target.value in easing
            ? easing[target.value]
            : target.value;
    slidy.update({ [target.name]: value });
    options[target.name] = value;

    if (target.name === 'length') {
        getPhotos(node, utils.randomQ(1, 69), value);
    }
}
export function getVar(node, name) {
    return getComputedStyle(node).getPropertyValue(name);
}
export function setVar(node, name, value) {
    return node.style.setProperty(`--${name}`, value);
}

export function randomQ(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isNum(number) {
    return !isNaN(parseFloat(number)) && isFinite(+number);
}

export function activate(target, prop) {
    target.classList.toggle('active');
    prop = !prop;
    switch (target.id) {
        case 'vertical':
            utils.setVar(main, 'flow', prop ? 'column' : 'row');
            slidy.to(options.index);
            break;

        default:
            break;
    }
    return prop;
}
