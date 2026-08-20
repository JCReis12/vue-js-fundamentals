<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useHabits } from '../composables/useHabits'
const route = useRoute()
const { getHabitById, calculateStreak, calculateCompletionRate } = useHabits()
const habit = computed(() => getHabitById(route.params.id as string))
const history = computed(() => Array.from({ length: 14 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (13 - index)); const key = date.toISOString().slice(0, 10); return { key, label: date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''), done: habit.value?.completedDates.includes(key) } }))
</script>

<template>
  <div v-if="habit" class="page details-page"><RouterLink class="back-link" to="/">← Voltar para hábitos</RouterLink><header class="details-header"><div class="habit-icon habit-icon--large">{{ habit.icon }}</div><div><span class="eyebrow">{{ habit.category }} · {{ habit.frequency }}</span><h1>{{ habit.name }}</h1><p>{{ habit.description }}</p></div></header><section class="details-stats"><div><strong>{{ calculateStreak(habit) }}</strong><span>Sequência atual</span></div><div><strong>{{ habit.bestStreak }}</strong><span>Melhor sequência</span></div><div><strong>{{ calculateCompletionRate(habit) }}%</strong><span>Taxa de conclusão</span></div></section><section class="history-panel"><div class="section-heading"><div><h2>Últimos 14 dias</h2><p>Acompanhe a cadência da sua rotina.</p></div></div><div class="history-grid"><div v-for="day in history" :key="day.key" class="history-day"><span>{{ day.label }}</span><i :class="{ done: day.done }">{{ day.done ? '✓' : '' }}</i><small>{{ day.key.slice(8) }}</small></div></div></section></div>
  <div v-else class="empty-state"><h3>Hábito não encontrado</h3><RouterLink class="button button--primary" to="/">Voltar ao dashboard</RouterLink></div>
</template>