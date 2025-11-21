<template>
  <li class="flex items-start gap-2">
    <Icon
      :name="
        type === 'positive'
          ? 'mdi:check-circle'
          : type === 'negative'
            ? 'mdi:close-circle'
            : 'mdi:information'
      "
      :class="[
        'w-4 h-4 mt-0.5 flex-shrink-0',
        type === 'positive'
          ? 'text-green-500'
          : type === 'negative'
            ? 'text-red-500'
            : 'text-gray-400',
      ]"
    />
    <span><slot /></span>
  </li>
</template>

<script setup lang="ts">
interface Props {
  type?: 'positive' | 'negative' | 'neutral'
}

withDefaults(defineProps<Props>(), {
  type: 'neutral',
})
</script>
