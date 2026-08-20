<script setup lang="ts">
defineProps<{ label: string; value: string | number; detail: string; tone: 'green' | 'coral' | 'yellow' | 'dark' }>()
</script>

<template>
  <article class="stat-card" :class="`stat-card--${tone}`">
    <div class="stat-card__top"><span>{{ label }}</span><span class="stat-card__dot"></span></div>
    <strong>{{ value }}</strong>
    <small>{{ detail }}</small>
  </article>
</template>