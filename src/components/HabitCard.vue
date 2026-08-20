<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Habit } from '../types/habit'
defineProps<{ habit: Habit; completed: boolean; streak: number }>()
const emit = defineEmits<{ toggle: []; edit: []; delete: [] }>()
</script>

<template>
  <article class="habit-card" :class="{ 'habit-card--done': completed }">
    <div class="habit-icon">{{ habit.icon }}</div>
    <div class="habit-card__body">
      <div class="habit-card__heading"><RouterLink :to="`/habit/${habit.id}`">{{ habit.name }}</RouterLink><span class="category-badge">{{ habit.category }}</span></div>
      <p>{{ habit.description }}</p>
      <div class="habit-meta"><span>{{ habit.frequency }}</span><span>◔ {{ streak }} {{ streak === 1 ? 'dia' : 'dias' }}</span></div>
    </div>
    <div class="habit-card__actions">
      <button class="check-button" :class="{ checked: completed }" type="button" :aria-label="completed ? 'Desmarcar hábito' : 'Concluir hábito'" @click="emit('toggle')">{{ completed ? '✓' : '' }}</button>
      <button class="icon-action" type="button" aria-label="Editar hábito" @click="emit('edit')">✎</button>
      <button class="icon-action icon-action--danger" type="button" aria-label="Excluir hábito" @click="emit('delete')">×</button>
    </div>
  </article>
</template>