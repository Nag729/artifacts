<template>
  <AnchorHeading :id="id" tag="h3">
    <slot />
  </AnchorHeading>
</template>

<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>
