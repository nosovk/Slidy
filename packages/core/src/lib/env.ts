import { clamp, loop } from './utils';
import type { Options, UniqEvent, Detail, EventMap } from '../types';

function mount(node: HTMLElement) {
    return new Promise((resolve, reject) => {
        let count = 0;
        const mounting = setInterval(() => {
            count++;
            if (count >= 69) {
                clearInterval(mounting);
                reject('few slides');
            } else if (node.children.length > 1) {
                clearInterval(mounting);
                resolve(indexed(node));
            }
        }, 16);
    });
}

function indexed(node: HTMLElement) {
    return loop(node.children, (child, i) => (child.index = i));
}

function indexing(node: HTMLElement, options: Options, index: number): number {
    const length = node.children.length;
    return options.loop ? (index + length) % length : clamp(0, index, length - 1);
}

function coordinate(e: UniqEvent, options: Options): number {
    if (e.type === 'wheel') {
        const X = Math.abs(e.deltaX) >= Math.abs(e.deltaY);
        return (X && options.axis !== 'y') ? e.deltaX : (e.shiftKey || options.axis === 'y') ? e.deltaY : 0;
    } else {
        const mix = (e: UniqEvent): Touch => (e.touches && e.touches[0]) || e;
        return options.axis === 'y' ? mix(e).pageY : mix(e).pageX;
    }
}

function dispatch(node: HTMLElement, name: string, detail?: Detail): void {
    node.dispatchEvent(new CustomEvent(name, { detail }));
}

function listen(node: Window | HTMLElement, events: EventMap, on = true): void {
    loop(events, (item) => {
        const state = on ? 'addEventListener' : 'removeEventListener';
        const [event, handle, options] = item;
        node[state](event, handle, options);
    });
}

export { mount, listen, dispatch, indexing, coordinate };