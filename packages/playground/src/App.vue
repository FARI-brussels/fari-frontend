<script setup>

import { CheckIcon } from '@fari-brussels/icons/vue'
import { FContainer, FButtonIcon, FDivider, FTouchButton } from '@fari-brussels/components';
</script>

<template>
  
  <main>
    <CheckIcon color="primary" class="stroke-color-primary"/>
    <FContainer>
      <FTouchButton name="check" color="secondary" iconColor="secondary" label="hello">
        <template #prepend-icon>
          <CheckIcon color="primary" class="stroke-color-primary"/>
        </template>
      </FTouchButton >
      <FDivider class="bg-color-primary mt-xl"/>
      <FButtonIcon name="check" color="primary" iconColor="secondary"/>

    </FContainer>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
