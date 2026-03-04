<template>
  <div class="mt-8 mb-8">
    <Icon :name="icon" size="112" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
}>()
</script>
