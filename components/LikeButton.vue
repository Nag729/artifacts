<template>
  <div class="flex my-8">
    <!-- Loading skeleton -->
    <div
      v-if="isLoading && likes === 0 && !hasLiked"
      class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
      style="min-width: 140px; height: 48px"
    >
      <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <div class="w-6 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div class="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>

    <!-- Like button -->
    <button
      v-else
      :disabled="isLoading"
      :title="hasLiked ? 'いいねを取り消す' : 'いいね'"
      class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200"
      :class="[
        hasLiked
          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500',
        isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105',
      ]"
      @click="handleLike"
    >
      <Icon
        :name="hasLiked ? 'mdi:heart' : 'mdi:heart-outline'"
        class="text-2xl transition-transform"
        :class="{ 'scale-125': isAnimating }"
      />
      <span class="text-base">{{ likes }}</span>
      <span class="text-sm">{{ hasLiked ? 'いいね済み' : 'いいね' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  articleSlug: string
}>()

const likesStore = useLikesStore()
const isLoading = ref(false)
const isAnimating = ref(false)

// Reactive getters from store
const likes = computed(() => likesStore.getLikeCount(props.articleSlug))
const hasLiked = computed(() => likesStore.hasLiked(props.articleSlug))

// Initialize on mount
onMounted(async () => {
  isLoading.value = true
  await likesStore.fetchLikeCount(props.articleSlug)
  await likesStore.checkHasLiked(props.articleSlug)
  isLoading.value = false
})

const handleLike = async () => {
  if (isLoading.value) return

  isLoading.value = true
  isAnimating.value = true

  await likesStore.toggleLike(props.articleSlug)

  isLoading.value = false
  setTimeout(() => {
    isAnimating.value = false
  }, 200)
}
</script>
