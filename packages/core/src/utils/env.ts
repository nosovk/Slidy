import type { Child, CssRules, DispathDetail, Options, Slidy, UniqEvent, EventMap } from '../types';

function mount(node: Slidy): Promise<HTMLCollectionOf<Child>> {
    return new Promise((resolve, reject) => {
        let count = 0;
        if (node) {
            const mounting = setInterval(() => {
                count++;
                if (count >= 69) {
                    count = 0;
                    clearInterval(mounting);
                    reject(`Slidy haven't items`);
                } else if (node.children.length > 2) {
                    const mounted = Array.from(node.children).every(
                        (child) => child && child.isConnected
                    );
                    if (mounted) {
                        count = 0;
                        clearInterval(mounting);
                        resolve(init(node));
                    }
                }
            }, 16);
        }
    });
}

function getFPS(): Promise<number> {
    return new Promise((resolve) =>
        requestAnimationFrame((t1: number) =>
            requestAnimationFrame((t2: number) => resolve(1000 / (t2 - t1)))
        )
    );
}

function dispatch(node: Slidy, name: string, detail?: DispathDetail) {
    node.dispatchEvent(new CustomEvent(name, { detail: detail as CustomEventInit<unknown> }));
}

function listen(node: Window | Slidy, events: EventMap, on = true): void {
    for (const [event, handle, options] of events) {
        const state = on ? 'addEventListener' : 'removeEventListener';
        if (node) node[state](event, handle, options);
    }
}

function init(node: Slidy, childs?: HTMLCollectionOf<Child>): HTMLCollectionOf<Child> {
    childs = node.children as HTMLCollectionOf<Child>;
    for (let index = 0; index < childs.length; index++) {
        childs[index].index = index;
    }
    return childs;
}

function style(node: HTMLElement, styles: Partial<CssRules>): void {
    for (const property in styles) {
        const PROP = property as keyof CssRules;
        node.style[PROP as never] = styles[PROP] as never;
    }
}

function indexing(node: Slidy, index: number, loop?: boolean) {
    return loop
        ? index < 0
            ? node.children.length - 1
            : index > node.children.length - 1
                ? 0
                : index
        : clamp(0, index, node.children.length - 1);
}

let x = 0,
    y = 0,
    dx = 0,
    dy = 0;
function coordinate(e: UniqEvent, options: Options) {
    if (e.type === 'wheel') {
        const WX = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        if (WX || e.shiftKey) e.preventDefault();
        return e.shiftKey ? (WX ? Math.sign(e.deltaX) : Math.sign(e.deltaY)) : WX ? e.deltaX : 0;
    } else {
        const DX = (Math.abs(dx) - Math.abs(dy)) >= (options.sensity as number)
        if (options.vertical ? !DX : DX) e.preventDefault();
        if (e.type === 'mousedown' || e.type === 'touchstart') {
            x = mix(e).pageX;
            y = mix(e).pageY;
        } else if (e.type === 'mousemove' || e.type === 'touchmove') {
            dx = x - mix(e).pageX;
            dy = y - mix(e).pageY;
            x = mix(e).pageX;
            y = mix(e).pageY;
            console.log(DX)
        }
        return options.vertical ? dy : dx;
    }
}

function mix(e: UniqEvent): Touch {
    return e.touches && e.touches[0] || e
}

function clamp(min: number, val: number, max: number) {
    return Math.min(max, Math.max(min, val));
}

function throttle(
    fn: (args: any) => void,
    ms: number,
    wait?: boolean,
    tm?: NodeJS.Timeout
): (args: any) => void {
    return (args) => {
        if (!wait) {
            fn(args);
            wait = true;
            tm && clearTimeout(tm);
            tm = setTimeout(() => (wait = false), ms);
        }
    };
}

function delay(fn: (args: any) => void, ms: number, tm?: NodeJS.Timeout): (args: any) => void {
    tm && clearTimeout(tm);
    return (args: any) => {
        tm = setTimeout(() => fn(args), ms);
    };
}

function debounce(fn: (args: any) => void, ms: number) {
    let timeout: NodeJS.Timeout;
    return function (args: any) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(args), ms);
    };
}

export {
    clamp,
    coordinate,
    style,
    indexing,
    delay,
    dispatch,
    init,
    listen,
    throttle,
    debounce,
    mount,
    getFPS,
};
