<template>
  <button
    class="flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    aria-label="Toggle dark mode"
    @click="toggleColorMode"
  >
    <Icon
      v-if="colorMode.value === 'light'"
      name="mdi:weather-night"
      class="w-6 h-6 text-gray-600"
    />
    <Icon v-else name="mdi:weather-sunny" class="w-6 h-6 text-gray-300" />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
