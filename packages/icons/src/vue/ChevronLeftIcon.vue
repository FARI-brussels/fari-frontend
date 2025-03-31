
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
  <svg :width="size" :height="size" viewBox="0 0 13 22" :fill="color" xmlns="http://www.w3.org/2000/svg"><path d="M11.3 1.52614L1.7 11.1261L11.3 20.7261" :stroke="color" stroke-:width="size" stroke-linecap="round" stroke-linejoin="round"/></svg>
</template>