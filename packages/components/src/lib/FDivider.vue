<template>
  <div
    :class="`divider ${$props.orientation || 'horizontal'} ${$attrs.class || 'bg-color-black'}`"
  />
</template>

<script setup lang="ts">
defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>()
</script>

<style scoped lang="scss">
.divider {
  opacity: 0.8;
}
.horizontal {
  height: 0.1rem;
  width: 100%;
}

.vertical {
  width: 0.08rem;
  height: 100%;
}
</style>
