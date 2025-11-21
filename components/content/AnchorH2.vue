<template>
  <AnchorHeading :id="id" tag="h2">
    <slot />
  </AnchorHeading>
</template>

<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>
