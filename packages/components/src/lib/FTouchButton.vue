<template>
  <button class="ripple" :disabled="props.disabled" :class="buttonClass">
    <slot name="prepend-icon"></slot>
    <p class="button-text">{{ props.label }}</p>

    <slot name="append-icon"></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

interface Button {
  label: string
  type?: 'primary' | 'secondary' | 'neutral'
  onDark?: boolean
  disabled?: boolean
}

const props = defineProps<Button>()

const buttonClass = computed(
  () => `button button--${props.type || 'primary'} ${props.onDark && 'dark'}`
)
</script>

<style scoped lang="scss">
@use '@fari/style/sass' as *;
@use 'sass:color';

.button {
  display: flex;
  border-radius:$border-lg;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem $space-md;
  border: none;
  cursor: pointer;
  background-position: center;
  transition: background 400ms ease-in-out;
  text-transform: capitalize;

  .button-text {
    margin: 0 0.6rem;
    font-size: $body;
    font-weight: $bold;
  }

  &--primary {
    background-color: $primary;
    color: $white;

    &:hover {
      background: color.scale($primary, $lightness: 10%)
        radial-gradient(circle, transparent 1%, color.scale($primary, $lightness: 10%) 1%)
        center/15000%;
    }

    &:active {
      background-color: color.scale($primary, $lightness: -5%);
      background-size: 100%;
      transition: background 0s;
    }

    &.dark {
      background-color: $blue-light;
    }
  }

  &--secondary {
    background-color: transparent;
    color: $blue-light;
    border: 2px solid $blue-light;
    transition: all 500ms ease-in-out;

    &:hover {
      border: 2px solid color.scale($primary, $lightness: 20%);
      transition: all 200ms ease-in-out;
    }

    &:active {
      background-color: color.scale($primary, $lightness: 20%);
      background-size: 100%;
      color: white;
      transition: background 0s;
    }

    &.dark {
      color: $white;
      &:hover {
        border: 2px solid color.scale($blue-light, $lightness: 20%);
      }
    }
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
