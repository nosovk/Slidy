import { coordinate, style, dispatch, init, listen, throttle, onMount } from './utils/env';
import { find, shuffle, history, replace, indexing } from './utils/dom';
import { maxMin } from './utils/helpers';

import type { Options, Slidy, UniqEvent } from './types';

const base: Options = {
    index: 0,
    length: 1,
    gravity: 1.2,
    duration: 375,
    snap: undefined,
    vertical: false,
    clamp: false,
    loop: false
}

export function slidy(
    node: Slidy,
    options: Partial<Options> = base
): {
    update: (options: Options) => void;
    destroy: () => void;
    to: (index: number, target?: number) => void;
} {
    let raf: number,
        wheeltime: NodeJS.Timeout,
        reference = 0,
        direction = 0,
        timestamp = 0,
        velocity = 0,
        position = 0,
        gap = 0,
        frame = position,
        hix = options.index,
        snap = options.snap,
        gravity = options.gravity as number,
        scrolled = false

    options = { ...base, ...options }

    const DURATION = Math.pow(options.duration as number, 2) / 1000

    const WINDOW_EVENTS: [string, EventListenerOrEventListenerObject, AddEventListenerOptions?][] = [
        ['touchmove', onMove as EventListenerOrEventListenerObject, { passive: false }],
        ['mousemove', onMove as EventListenerOrEventListenerObject],
        ['touchend', onUp as EventListenerOrEventListenerObject],
        ['mouseup', onUp as EventListenerOrEventListenerObject],
        ['scroll', onScroll as EventListenerOrEventListenerObject, { capture: true }]
    ];
    const NODE_EVENTS: [string, EventListenerOrEventListenerObject, AddEventListenerOptions?][] = [
        ['contextmenu', clear],
        ['touchstart', onDown as EventListenerOrEventListenerObject],
        ['mousedown', onDown as EventListenerOrEventListenerObject],
        ['keydown', onKeys as EventListenerOrEventListenerObject],
        [
            'wheel',
            throttle(onWheel, (DURATION / gravity) * 2) as EventListenerOrEventListenerObject,
            { passive: false, capture: true }
        ]
    ];

    const RAF = requestAnimationFrame;
    const RO = new ResizeObserver(() => {
        to(options.index as number);
        dispatch(node, 'resize', node);
    });

    onMount(node, options.length)
        .then(({ childs, length }) => {
            replace(node, options.index as number, options.loop);

            snap = options.snap
            options.length = length
            hix = options.index as number
            gap = find(node, options).gap();
            gravity = options.gravity as number
            position = options.loop ? find(node, options).position(hix, snap, gap) : position

            style(node, { outline: 'none', overflow: 'hidden' });
            node.tabIndex = 0

            listen(node, NODE_EVENTS);
            RO.observe(node as Element);

            dispatch(node, 'mount', { childs, options });
        })
        .catch((error: Error) => console.error(error));

    function move(pos: number): void {
        direction = Math.sign(pos);
        position += options.loop ? looping(pos) : pos;
        options.index = find(node, options).index(position, snap);

        graviting(options.index)
        moving(node.children);
        dispatch(node, 'move', { index: options.index, position });

        function graviting(index: number) {
            gravity = options.loop
                ? options.gravity as number
                : (index === 0 && direction <= 0) || (index === options.length as number - 1 && direction >= 0)
                    ? maxMin(1.8, 0, gravity + 0.015)
                    : options.gravity as number;
        }
        function moving(childs: HTMLCollection) {
            for (let index = 0; index < childs.length; index++) {
                style(childs[index] as Slidy, {
                    transform: translate(options.vertical)
                })
            }
        }

        function translate(vertical?: boolean): string {
            const direction = vertical ? `0, ${-position}px, 0` : `${-position}px, 0, 0`;
            return `translate3d(${direction})`
        }

        function looping(pos: number): number {
            if (hix !== options.index) {
                pos -= history(node, direction, gap, options)
                shuffle(node, direction)
                frame = position + pos
                hix = options.index;
            }
            return pos;
        }
    }

    function track(): void {
        const now = performance.now();
        const elapsed = now - timestamp;
        const delta = position - frame;
        const speed = (1000 * delta) / (1 + elapsed);

        velocity = (2 - gravity) * speed + 0.2 * velocity;

        if (elapsed < 60) return;

        timestamp = now;
        frame = position;
    }

    function scroll(index: number, duration: number, timestamp: number, amplitude = 0, target?: number): void {
        snapping(index)

        target = options.snap || options.loop ||
            (!options.loop && !options.snap && (index === 0 || index === options.length as number - 1))
            ? find(node, options).position(index, snap, gap)
            : position + amplitude;
        amplitude = target - position;

        RAF(function scroll(time: number) {
            const elapsed = (timestamp - time) / duration;
            const delta = amplitude * Math.exp(elapsed);

            if (timestamp < time) {
                target = options.loop ? find(node, options).position(index, snap, gap) : target
                move(target as number - position - delta);
            }

            raf = Math.abs(delta) > 0.5 ? RAF(scroll) : 0;
        });
    }

    function snapping(index: number): void {
        snap = options.loop
            ? options.snap : index === 0
                ? 'start' : index === options.length as number - 1
                    ? 'end' : options.snap
    }

    function to(index: number, duration = DURATION, target?: number): void {
        clear();

        index = indexing(node, index, options.loop);
        target = target || find(node, options).position(index, snap, gap)

        scroll(index, duration, performance.now(), target - position)
    }

    function onDown(e: UniqEvent): void {
        clear();
        node.focus()

        reference = coordinate(e, options.vertical);
        timestamp = performance.now();
        frame = position;
        velocity = 0

        listen(window, WINDOW_EVENTS);

        if (e.type === 'mousedown') e.preventDefault()
    }

    function onMove(e: UniqEvent): void {
        node.blur()
        const delta = reference - coordinate(e, options.vertical)
        reference = coordinate(e, options.vertical);

        move(delta * (2 - gravity));
        track();

        if (Math.abs(delta) > 5) {
            e.preventDefault()
        } else if (scrolled) {
            gravity = 2
            to(options.index as number, DURATION / gravity)
        }

        e.preventDefault()
        e.stopPropagation()
    }

    function onUp(e: UniqEvent): void {
        clear();

        const amplitude = velocity * (2 - gravity);
        const index = find(node, options).index(position + amplitude, snap)
        const condition =
            options.clamp ||
            ((options.duration && Math.abs(amplitude) <= options.duration) && options.snap) || (!options.loop && (index === 0 || index === options.length as number - 1))

        scroll(index, (condition ? DURATION : options.duration as number), performance.now(), amplitude)

        e.preventDefault()
        e.stopPropagation()
    }


    function onWheel(e: UniqEvent): void {
        clear();

        const coord = coordinate(e, options.vertical) * (2 - gravity);
        // const sign = Math.trunc(coord * gravity * (e.shiftKey ? -1 : 1))

        // if (e.shiftKey || options.clamp) {
        to(options.index as number + Math.sign(coord * (e.shiftKey ? -1 : 1)))
        // } else {
        //     move(coord);
        //     wheeltime = setTimeout(() => {
        //         to(options.index as number);
        //         gravity = options.gravity as number;
        //     }, 100);
        // }
    }

    function onKeys(e: KeyboardEvent): void {
        const keys = ['ArrowRight', 'Enter', ' '];
        if (e.key === 'ArrowLeft') {
            to(options.index as number - 1);
        } else if (keys.includes(e.key)) {
            to(options.index as number + 1);
        }
        dispatch(node, 'keys', e.key);
    }

    function onScroll(): void {
        scrolled = true
    }

    function clear(): void {
        scrolled = false
        gravity = options.gravity as number
        clearTimeout(wheeltime as NodeJS.Timer);
        cancelAnimationFrame(raf);
        listen(window, WINDOW_EVENTS, false);
    }

    function update(opts: Options): void {
        for (const key in opts) {
            if (options[key as keyof Options] !== opts[key as keyof Options]) {
                switch (key) {
                    case 'index':
                        options[key] = indexing(node, opts[key] as number, options.loop);
                        to(options[key] as number);
                        break;
                    case 'gravity':
                        options[key] = maxMin(2, 0, opts[key] as number);
                        gravity = options[key] as number;
                        break;
                    case 'snap':
                        options[key] = opts[key];
                        snap = options[key];
                        break;
                    case 'length':
                        options[key] = opts[key];
                        init(node);
                        to(options.index as number);
                        break;

                    default:
                        options[key as keyof Options] = opts[key as keyof Options] as never;
                        break;
                }
            }
        }
        dispatch(node, 'update', options);
    }

    function destroy(): void {
        clear();
        RO.disconnect();
        listen(node, NODE_EVENTS, false);
        dispatch(node, 'destroy', node);
    }
    return { update, destroy, to };
}
