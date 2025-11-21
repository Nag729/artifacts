<template>
  <div v-if="src">
    <img
      :src="resolvedSrc"
      :alt="alt"
      :class="thumbnailClass"
      class="cursor-pointer hover:opacity-90 transition-opacity"
      @click="openModal"
    />

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80"
        @click="closeModal"
      >
        <div class="relative max-w-4xl max-h-[90vh]" @click.stop>
          <button
            class="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            @click="closeModal"
          >
            <Icon name="mdi:close" class="w-8 h-8" />
          </button>
          <img
            :src="resolvedSrc"
            :alt="alt"
            class="max-w-full max-h-[85vh] object-contain rounded-lg bg-white p-4 shadow-2xl"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  src?: string
  alt?: string
  thumbnailClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  thumbnailClass: 'w-full h-32 object-cover rounded-lg',
})

const { imagePath } = useAssetPath()

const resolvedSrc = computed(() => {
  if (!props.src) return undefined
  return imagePath(props.src)
})

const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
}
</script>
