import type { Action } from 'svelte/action';
import { listen } from 'svelte/internal';

const focusTrap: Action<HTMLElement, boolean> = (node, active = true) => {
  const handleKeydown = event => {
    if (active && event.key === "Tab") {
      const nodes = [] as HTMLElement[];

      const collectRecusive = (node: HTMLElement) => {
        node.childNodes.forEach((node) => {
          if ((node as HTMLElement).shadowRoot) {
            collectRecusive((node as HTMLElement).shadowRoot as unknown as HTMLElement);
          } else {
            collectRecusive(node as HTMLElement);
          }
        });

        nodes.push(node);
      };

      collectRecusive(node);

      const tabbable = Array.from(nodes).filter(node => (node as HTMLElement).tabIndex >= 0)

      let index = tabbable.indexOf(document.activeElement as HTMLElement);

      if (index === -1 && event.shiftKey) index = 0

      index += tabbable.length + (event.shiftKey ? -1 : 1)
      index %= tabbable.length

      const target = tabbable[index] as HTMLElement;

      if (target) target.focus();

      event.preventDefault()
    }
  }

  const unsubscribe = listen(window, 'keydown', handleKeydown);

  return {
    destroy: unsubscribe,
    update: (value) => active = value,
  }
}

export { focusTrap }