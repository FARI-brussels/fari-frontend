<template>
  <transition name="bounce">
    <slot class="bounce-container" v-bind="$attrs" />
  </transition>
</template>

<style scoped lang="scss">
.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
