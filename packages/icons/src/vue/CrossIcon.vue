
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
  <svg :width="size" :height="size" viewBox="0 0 25 24" :fill="color" xmlns="http://www.w3.org/2000/svg"><path d="M21.75 3L3.75 21" :stroke="color" stroke-:width="size" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.75 21L3.75 3" :stroke="color" stroke-:width="size" stroke-linecap="round" stroke-linejoin="round"/></svg>
</template>