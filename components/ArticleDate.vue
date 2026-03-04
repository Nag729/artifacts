<template>
  <time class="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-6">
    <Icon name="mdi:calendar-outline" size="16" />
    {{ formatted }}
  </time>
</template>

<script setup lang="ts">
const props = defineProps<{
  date: string
}>()

const dayjs = useDayjs()
const formatted = dayjs(props.date).locale('ja').format('YYYY年M月D日')
</script>
