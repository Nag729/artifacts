<template>
  <component :is="tag" :id="id" class="cursor-pointer group relative" @click="handleClick">
    <span class="relative inline-block">
      <slot />
      <span
        class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"
      ></span>
    </span>
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  id: string
}>()

const handleClick = () => {
  // URL を更新（履歴には追加しない）
  history.replaceState(null, '', `#${props.id}`)

  // 自前でスクロール（headerOffset を考慮するため）
  scrollToElement(props.id)
}
</script>
