<template>
  <transition name="slide-up">
    <slot class="slide-container" v-bind="$attrs" />
  </transition>
</template>

<style scoped lang="scss">
.slide-up-enter-active,
.slide-up-leave-active {
  opacity: 1;
  transition: all 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
