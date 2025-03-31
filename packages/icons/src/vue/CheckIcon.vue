
<script setup lang="ts">
defineProps<{
  size?: string;
  color?: string;
}>({
  size: '24',
  color: 'currentColor',
});
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 25 24" :fill="color" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_188_349)"><path d="M2.75 11.5L9.75 18.5L22.75 5.5" :stroke="color" stroke-:width="size" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_188_349"><rect :width="size" :height="size" :fill="color" transform="translate(0.75)"/></clipPath></defs></svg>
</template>