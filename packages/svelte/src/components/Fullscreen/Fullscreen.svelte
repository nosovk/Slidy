<script lang="ts" context="module">
  import { focusTrap } from './focus';
  import { clickOutside } from './click-outside';
  import { createButton } from './button';

  /**
   * Slidy Component
   */
  import { Slidy } from '../../index';
  /**
   * Slidy Component Types
   */
  import type { SlidyOptions } from "../Slidy/Slidy.types";
  import type { SlidyStyles } from "@slidy/assets/types";
  import type { PluginArgs } from '@slidy/core';

  type Optional<T> = T | undefined; 
</script>

<!-- Minimize Icon <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.25 19.25V16.75C9.25 15.6454 8.35457 14.75 7.25 14.75H4.75"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.75 19.25V16.75C14.75 15.6454 15.6454 14.75 16.75 14.75H19.25"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.75 4.75V7.25C14.75 8.35457 15.6454 9.25 16.75 9.25H19.25"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.25 4.75V7.25C9.25 8.35457 8.35457 9.25 7.25 9.25H4.75"></path>
</svg> -->

<script lang="ts">
  export let opened = false;

  export let animation: Optional<SlidyOptions["animation"]> = undefined;
	export let arrows: Optional<boolean> = undefined;
	export let axis: Optional<SlidyOptions["axis"]> = undefined;
	export let background: Optional<boolean> = undefined;
	export let counter: Optional<boolean> = undefined;
	export let clamp: Optional<number> = undefined;
	export let classNames: Optional<SlidyStyles> = undefined;
	export let duration: Optional<number> = undefined;
	export let easing: Optional<SlidyOptions["easing"]> = undefined;
	export let getImgSrc: Optional<SlidyOptions["getImgSrc"]> = undefined;
	export let getThumbSrc: Optional<SlidyOptions["getThumbSrc"]> = undefined;
	export let navigation: Optional<boolean> = undefined;
	export let gravity: Optional<number> = undefined;
	export let i18n: Optional<SlidyOptions["i18n"]> = undefined;
	export let indent: Optional<SlidyOptions["indent"]> = undefined;
	export let index: Optional<number> = undefined;
	export let loop: Optional<boolean> = undefined;
	export let groups: Optional<number> = undefined;
	export let plugins: Optional<SlidyOptions["plugins"]> = [];
	export let progress: Optional<boolean> = undefined;
	export let sensity: Optional<number> = undefined;
	export let snap: Optional<SlidyOptions["snap"]> = undefined;
	export let thumbnail: Optional<boolean> = undefined;
	export let vertical: Optional<boolean> = undefined;
  
	export let slides: SlidyOptions["slides"];

  const open = () => {
    opened = true;
  }

  const close = () => {
    opened = false;
  }

  /**
   * Plugin that adds fullscreen button into `<Slidy />` ui
   */
  const buttonPlugin = ({ node }: PluginArgs) => {
    node.insertAdjacentElement('afterend', createButton(open));
  };

  /**
   * `@slidy/core` mutates the `plugins` array, so once `<Slidy />` called more that 1 time is recivies `undefined` instead of a function
   */
  let initialPlugins = (showButton = true) => {
    return [...(plugins || []), ...(showButton ? [buttonPlugin] : [])];
  }
</script>

{#if opened}
  <div use:focusTrap aria-modal="true" class="root">
    <div use:clickOutside={close} class="holder">
      <Slidy
        {animation}
        {arrows}
        {axis}
        {background}
        {counter}
        {clamp}
        {classNames}
        {duration}
        {easing}
        {getImgSrc}
        {getThumbSrc}
        {navigation}
        {gravity}
        {i18n}
        {indent}
        {loop}
        {groups}
        {progress}
        {sensity}
        {snap}
        {thumbnail}
        {vertical}
        {slides}
        bind:index
        plugins={initialPlugins(false)}
      />
    </div>
    <div class="overlay"/>
  </div>
{:else}
  <Slidy 
    {animation}
    {arrows}
    {axis}
    {background}
    {counter}
    {clamp}
    {classNames}
    {duration}
    {easing}
    {getImgSrc}
    {getThumbSrc}
    {navigation}
    {gravity}
    {i18n}
    {indent}
    {loop}
    {groups}
    {progress}
    {sensity}
    {snap}
    {thumbnail}
    {vertical}
    {slides}
    bind:index
    plugins={initialPlugins()}
  />
{/if}

<style>
  .root {
    position: absolute;
    z-index: 16777271;
    inset: 0;

    display: flex;
    align-items: center;
  }

  .holder {
    height: 95vh;

    position: absolute;
    z-index: 16777271;
  }

  .overlay {
    inset: 0;
    position: fixed;
    overflow: hidden;
    cursor: zoom-out;
    z-index: 16777270;
    visibility: visible;
    width: 100%;
    height: 100vh;

    background: #010203;
  }
</style>