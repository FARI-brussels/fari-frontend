<template>
  <button class="button" :class="buttonClassList" :disabled="$props.disabled" :style="buttonStyle">
    <FIcon
      :name="name"
      :color="colors[props.color || 'primary']"
      :viewBox="viewBox"
      :width="width"
      :height="height"
    />
  </button>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import type { Color } from '@/types/Color'
import type { StrokeColor, IconName } from '@/types/Icon'
import FIcon from '@/components/FIcon.vue'

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
  small?: boolean
  disabled?: boolean
  color?: Color
  bordered?: boolean
  onDark?: boolean
}

const props = defineProps<Button>()

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
@use '@/styles/variables/colors.scss' as c;
@use '@/styles/variables/borders.scss' as b;
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
  border-radius: b.$rounded;
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
