<script setup lang="ts">
import type { HabitCategory } from '../types/habit'
defineProps<{ search: string; status: 'Todos' | 'Concluídos' | 'Pendentes'; category: HabitCategory | 'Todas' }>()
const emit = defineEmits<{ 'update:search': [value: string]; 'update:status': [value: 'Todos' | 'Concluídos' | 'Pendentes']; 'update:category': [value: HabitCategory | 'Todas'] }>()
const categories: (HabitCategory | 'Todas')[] = ['Todas', 'Saúde', 'Estudos', 'Trabalho', 'Exercícios', 'Pessoal']
</script>

<template>
  <div class="filters">
    <label class="search-box"><span>⌕</span><input :value="search" placeholder="Buscar hábito..." @input="emit('update:search', ($event.target as HTMLInputElement).value)" /></label>
    <div class="filter-tabs">
      <button v-for="option in ['Todos', 'Concluídos', 'Pendentes'] as const" :key="option" type="button" :class="{ active: status === option }" @click="emit('update:status', option)">{{ option }}</button>
    </div>
    <select :value="category" aria-label="Filtrar por categoria" @change="emit('update:category', ($event.target as HTMLSelectElement).value as HabitCategory | 'Todas')">
      <option v-for="option in categories" :key="option" :value="option">{{ option === 'Todas' ? 'Todas as categorias' : option }}</option>
    </select>
  </div>
</template>