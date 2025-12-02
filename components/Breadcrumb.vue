<template>
  <nav aria-label="パンくずリスト" class="mb-6">
    <ol
      class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <span v-if="index > 0" class="mx-2 text-gray-400">/</span>
        <NuxtLink
          v-if="!item.current"
          :to="item.path"
          class="hover:text-gray-900 dark:hover:text-white transition-colors"
          itemprop="item"
        >
          <span itemprop="name">{{ item.label }}</span>
        </NuxtLink>
        <span
          v-else
          class="text-gray-900 dark:text-white font-medium"
          itemprop="name"
          aria-current="page"
        >
          {{ item.label }}
        </span>
        <meta itemprop="position" :content="String(index + 1)" />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  path: string
  current?: boolean
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
