import type { Action } from 'svelte/action';
import { listen } from 'svelte/internal';

const clickOutside: Action<HTMLElement, (() => void)> = (node, handler) => {
  const handleClick = (event: MouseEvent) => {
    if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented && handler) {
      handler()
    }
  };

  const unsubscribe = listen(document, 'click', handleClick as any, true);

  return {
    destroy: unsubscribe,
  }
}

export { clickOutside }