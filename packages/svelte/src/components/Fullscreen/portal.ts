import type { Action } from 'svelte/action';

const portal: Action<HTMLDivElement, HTMLElement> = (node, target = document.body) => {
  target.appendChild(node);

  /**
   * `destroy` method is not needed here, because svelte deletes the node
   */
  return {}
}

export { portal }