<template>
  <div>
    <!-- Loading bar for page transitions -->
    <NuxtLoadingIndicator color="#e11d48" :height="3" :duration="2000" :throttle="200" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Full page skeleton for initial load -->
    <ClientOnly>
      <template #fallback>
        <AppLoading />
      </template>
    </ClientOnly>
  </div>
</template>
