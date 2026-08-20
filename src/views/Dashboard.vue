<script setup lang="ts">
import { computed, ref } from 'vue'
import DashboardCard from '../components/DashboardCard.vue'
import HabitCard from '../components/HabitCard.vue'
import HabitFilters from '../components/HabitFilters.vue'
import HabitForm from '../components/HabitForm.vue'
import { useHabits } from '../composables/useHabits'
import type { Habit, HabitCategory, HabitDraft } from '../types/habit'

const { habits, today, addHabit, updateHabit, deleteHabit, toggleHabit, calculateStreak, restoreExamples } = useHabits()
const search = ref('')
const status = ref<'Todos' | 'Concluídos' | 'Pendentes'>('Todos')
const category = ref<HabitCategory | 'Todas'>('Todas')
const formOpen = ref(false)
const editingHabit = ref<Habit | null>(null)
const filteredHabits = computed(() => habits.value.filter((habit) => {
  const matchesSearch = habit.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
  const matchesStatus = status.value === 'Todos' || (status.value === 'Concluídos' ? habit.completedDates.includes(today.value) : !habit.completedDates.includes(today.value))
  return matchesSearch && matchesStatus && (category.value === 'Todas' || habit.category === category.value)
}))
const completedToday = computed(() => habits.value.filter((habit) => habit.completedDates.includes(today.value)).length)
const bestStreak = computed(() => Math.max(0, ...habits.value.map((habit) => Math.max(habit.bestStreak, calculateStreak(habit)))))
const progress = computed(() => habits.value.length ? Math.round((completedToday.value / habits.value.length) * 100) : 0)
const openCreate = () => { editingHabit.value = null; formOpen.value = true }
const openEdit = (habit: Habit) => { editingHabit.value = habit; formOpen.value = true }
const saveForm = (draft: HabitDraft) => { editingHabit.value ? updateHabit(editingHabit.value.id, draft) : addHabit(draft); formOpen.value = false }
const removeHabit = (habit: Habit) => { if (window.confirm(`Excluir “${habit.name}”?`)) deleteHabit(habit.id) }
</script>

<template>
  <div class="page dashboard-page">
    <header class="page-header"><div><span class="eyebrow">QUARTA-FEIRA, 19 DE AGOSTO</span><h1>Bom dia, <em>João.</em></h1><p>Vamos cuidar do que importa hoje?</p></div><button class="button button--primary" type="button" @click="openCreate"><span>＋</span> Novo hábito</button></header>
    <section class="stats-grid"><DashboardCard label="Hábitos totais" :value="habits.length" detail="rotinas ativas" tone="green" /><DashboardCard label="Concluídos hoje" :value="completedToday" :detail="`${progress}% do seu dia`" tone="coral" /><DashboardCard label="Pendentes" :value="habits.length - completedToday" detail="ainda dá tempo" tone="yellow" /><DashboardCard label="Melhor sequência" :value="`${bestStreak} dias`" detail="seu recorde pessoal" tone="dark" /></section>
    <section class="section-heading"><div><h2>Suas rotinas</h2><p>Um pouco de consistência todos os dias.</p></div><button v-if="habits.length" class="text-button" type="button" @click="restoreExamples">Restaurar exemplos</button></section>
    <HabitFilters v-model:search="search" v-model:status="status" v-model:category="category" />
    <div v-if="filteredHabits.length" class="habit-list"><HabitCard v-for="habit in filteredHabits" :key="habit.id" :habit="habit" :completed="habit.completedDates.includes(today)" :streak="calculateStreak(habit)" @toggle="toggleHabit(habit.id)" @edit="openEdit(habit)" @delete="removeHabit(habit)" /></div>
    <div v-else class="empty-state"><span class="empty-state__icon">⌁</span><h3>{{ habits.length ? 'Nenhum hábito encontrado' : 'Você ainda não possui hábitos.' }}</h3><p>{{ habits.length ? 'Tente mudar sua busca ou seus filtros.' : 'Crie seu primeiro hábito para começar.' }}</p><button class="button button--primary" type="button" @click="habits.length ? (search = '') : openCreate()">{{ habits.length ? 'Limpar filtros' : '＋ Criar hábito' }}</button></div>
    <HabitForm v-if="formOpen" :habit="editingHabit" @submit="saveForm" @cancel="formOpen = false" />
  </div>
</template>