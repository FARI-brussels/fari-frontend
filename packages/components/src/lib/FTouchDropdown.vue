<template>
  <div class="dropdown" ref="dropdown">
    <FButtonIcon
      :name="props.icon || 'menu'"
      :iconColor="props.onDark ? 'blue-light' : 'primary'"
      @click.stop="toggleDropdown"
      role="listbox"
      class="activator"
      :small="props.small"
    />
    <FScaleTransition :show="isOpen">
      <div
        v-if="isOpen && (items || props.items || $slots.default)"
        v-bind="$attrs"
        :class="dropdownContainerClasses"
        ref="dropdownMenu"
      >
        <div v-if="$slots.default" class="content">
          <slot />
        </div>

        <template v-if="props.items">
          <template v-for="({ label, value }, index) in props.items || items" :key="value">
            <option @click="emitSelect(value)" class="dropdown-item p-sm pl-l">{{ label }}</option>
            <FDivider v-if="index !== props.items.length - 1" class="bg-color-white divider" />
          </template>
        </template>
      </div>
    </FScaleTransition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, useAttrs, useSlots } from 'vue'
import FButtonIcon from './FButtonIcon.vue'
import FScaleTransition from './FScaleTransition.vue'
import { onClickOutside } from '@vueuse/core'
import type { OnClickOutsideHandler } from '@vueuse/core'
import FDivider from './FDivider.vue'
import type { IconName } from '@fari-brussels/icons'


type Location =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom'

type Item = { label: string; value: string | number }

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const slots = useSlots()

const emit = defineEmits<{
  (e: 'select', value: string | number): void
}>()

const props = defineProps<{
  location?: Location
  items?: Item[]
  icon?: IconName
  small?: boolean
  onDark?: boolean
}>()

const isOpen = ref(false)

const dropdown = ref<HTMLDivElement | null>(null)
const dropdownMenu = ref<HTMLDivElement | null>(null)

const emitSelect = (value: string | number) => {
  emit('select', value)
  isOpen.value = false
}

const toggleDropdown = () => (isOpen.value = !isOpen.value)

const clickOutsideHandler: OnClickOutsideHandler = () => (isOpen.value = false)

onClickOutside(dropdown, clickOutsideHandler)

const dropdownContainerClasses = computed(() => {
  const defaultClasses = [
    'dropdown-menu',
    `${slots.default ? '' : 'bg-color-blue-light'}`,
    props.location || 'bottom-left',
    'rounded-s'
  ]
  const customClasses = ((attrs?.class as string) || '').split(' ')
  return [...defaultClasses, ...customClasses]
})
</script>

<style scoped lang="scss">
@use '@fari-brussels/style/sass' as *;
@use 'sass:color';

.activator {
  position: relative;
}

.dropdown {
  position: relative;
  height: fit-content;
}

.divider {
  width: 80%;
  margin: 0 auto;
}

.dropdown-menu {
  display: block;
  flex-direction: column;
  position: absolute;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  width: 100px;

  option {
    text-transform: uppercase;
    font-weight: $bold;
    &:first-child {
      border-top-left-radius: $border-md;
      border-top-right-radius: $border-md;
    }
    &:last-child {
      border-bottom-left-radius: $border-md;
      border-bottom-right-radius: $border-md;
    }
    &:active {
      color: color.adjust($blue-light, $lightness: 10%);
}
  }
}

.content {
  padding: 0.8rem;
}

.top-left {
  bottom: 110%;
  right: 0;
}

.top-right {
  bottom: 110%;
  left: 0;
}

.bottom-left {
  top: 110%;
  right: 0;
}
.bottom-right {
  top: 110%;
  left: 0;
}

.left-top {
  bottom: 0;
  right: 110%;
}

.left-bottom {
  top: 0;
  right: 110%;
}

.right-top {
  bottom: 0;
  left: 110%;
}

.right-bottom {
  top: 0;
  left: 110%;
}
</style>
