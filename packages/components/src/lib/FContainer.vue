<template>
  <div class="container" :class="{ 'container-dark': dark }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ dark?: boolean }>()
</script>

<style scoped lang="scss">
@use '@fari-frontend/style/sass' as *;
.container {
  border-radius:  $border-lg;
  background-color: $white;
  padding: $space-lg $space-xl;

  &-dark {
    background-color: $primary;
    border: 2px solid $blue-light;
  }
}
</style>
