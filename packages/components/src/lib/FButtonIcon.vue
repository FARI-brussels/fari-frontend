<template>
  <button class="button" :class="buttonClassList" :disabled="$props.disabled" :style="buttonStyle">
    <component :is="icon" v-if="icon" :class="`color-${iconColor}`"/>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Color } from '@/types/Color'
import type { StrokeColor } from '@/types/Color'
// import FIcon from '@/components/FIcon.vue'
import type { IconName } from '@fari-brussels/icons'
import { watchEffect, shallowRef } from 'vue'
import type { Component } from 'vue'
// @ts-ignore
import { toCamelCase, toPascalCase } from '../../../../utils/string'


const colors: { [C in Color]: StrokeColor } = {
  red: 'white',
  green: 'white',
  blue: 'white',
  white: 'blue-light',
  black: 'white',
  primary: 'white',
  secondary: 'white',
  'blue-light': 'white'
} as const

interface Button {
  name: IconName
  iconColor: Color
  small?: boolean
  disabled?: boolean
  color?: Color
  bordered?: boolean
  onDark?: boolean
}
const icon = shallowRef<Component | null>(null)
const props = defineProps<Button>()


watchEffect(async () => {
  if(!props.name)  return

  try {
    const iconsModule = await import('@fari-brussels/icons/vue') as Record<string, Component>;;
    icon.value = iconsModule[toPascalCase(props.name) + 'Icon'] || null;
  } catch (error) {
    console.error(`Failed to load icon: ${props.name}`, error);
    icon.value = null;
  }
});

const buttonClassList = computed(() => {
  const backgroundColor = `bg-color-${props.color || 'primary'}`
  const borderColor = props.bordered ? `bordered color-${colors[props.color || 'primary']}` : ''
  const small = props.small ? 'button-small' : ''
  return [backgroundColor, borderColor, small]
})

const buttonStyle = computed(() =>
  props.bordered ? { borderColor: colors[props.color || 'primary'] } : {}
)

const viewBox = computed(() => {
  switch (props.name) {
    case 'menu':
      return '2 -8 25 24'
    case 'tooltip':
      return '12 8 26 34'
    case 'sun':
      return '0 0 28 28'
    case 'sun-outline':
      return '0 0 26 26'
    case 'cloud':
      return '0 0 26 26'
    case 'overcast':
      return '0 0 26 26'
    case 'temperature':
      return '0 0 7 14'
    default:
      return '0 0 25 24'
  }
})

const width = computed(() => {
  switch (props.name) {
    case 'tooltip':
      return '36'
    case 'sun-outline':
      return '50'
    case 'cloud':
      return '50'
    case 'overcast':
      return '50'
    case 'temperature':
      return '30'
    default:
      return '30'
  }
})

const height = computed(() => {
  switch (props.name) {
    case 'tooltip':
      return '34'
    case 'settings':
      return '30'
    case 'sun-outline':
      return '50'
    case 'cloud':
      return '50'
    case 'overcast':
      return '50'
    case 'temperature':
      return '30'
    default:
      return '22'
  }
})
</script>

<style scoped lang="scss">
@use '@fari-brussels/style/sass' as *;
@use 'sass:color';

.button {
  position: relative;
  width: 76px;
  height: 76px;
  display: flex;
  flex-shrink: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  border-radius: $border-lg;
  border: none;
  cursor: pointer;
  &-small {
    padding: 0.5rem;
    width: 56px;
    height: 56px;
  }

  &:active {
    filter: brightness(70%);
    transition: filter 0.2s;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}

.bordered {
  border: 2px solid currentColor;
}
</style>
