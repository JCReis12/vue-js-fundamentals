<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isSidebarOpen = ref(false)
</script>

<template>
  <div class="app-shell">
    <button class="mobile-menu" type="button" aria-label="Abrir menu" @click="isSidebarOpen = !isSidebarOpen">
      <span></span><span></span><span></span>
    </button>
    <aside class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
      <div class="brand">
        <span class="brand-mark">✦</span>
        <span>Habit <strong>Flow</strong></span>
      </div>

      <nav class="nav-list" aria-label="Navegação principal">
        <RouterLink to="/" class="nav-link" @click="isSidebarOpen = false">
          <span>⌂</span> Visão geral
        </RouterLink>
        <RouterLink to="/" class="nav-link" @click="isSidebarOpen = false">
          <span>◷</span> Meus hábitos
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div class="focus-note">
          <span class="focus-note__icon">☀</span>
          <strong>Um dia de cada vez</strong>
          <small>Pequenos passos, grandes mudanças.</small>
        </div>
        <p class="sidebar-caption">SEU ESPAÇO DE FOCO</p>
      </div>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
