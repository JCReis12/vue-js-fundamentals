<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Habit, HabitCategory, HabitDraft, HabitFrequency } from '../types/habit'
const props = defineProps<{ habit?: Habit | null }>()
const emit = defineEmits<{ submit: [draft: HabitDraft]; cancel: [] }>()
const categories: HabitCategory[] = ['Saúde', 'Estudos', 'Trabalho', 'Exercícios', 'Pessoal']
const frequencies: HabitFrequency[] = ['Diário', 'Semanal']
const icons = ['💧', '⌨', '◒', '▤', '☾', '♫', '✦', '♡']
const blank = (): HabitDraft => ({ name: '', description: '', category: 'Pessoal', frequency: 'Diário', icon: '✦' })
const form = reactive<HabitDraft>(blank())
watch(() => props.habit, (habit) => Object.assign(form, habit ? { name: habit.name, description: habit.description, category: habit.category, frequency: habit.frequency, icon: habit.icon } : blank()), { immediate: true })
const submit = () => { if (form.name.trim()) emit('submit', { ...form, name: form.name.trim() }) }
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('cancel')">
    <form class="habit-form" @submit.prevent="submit">
      <div class="modal-heading"><div><span class="eyebrow">{{ habit ? 'ATUALIZAR ROTINA' : 'NOVA ROTINA' }}</span><h2>{{ habit ? 'Editar hábito' : 'Criar hábito' }}</h2></div><button class="close-button" type="button" aria-label="Fechar" @click="emit('cancel')">×</button></div>
      <label>Nome do hábito<input v-model="form.name" required placeholder="Ex.: Caminhar 30 minutos" /></label>
      <label>Descrição <span class="optional">opcional</span><textarea v-model="form.description" rows="3" placeholder="O que torna este hábito importante?"></textarea></label>
      <div class="form-grid"><label>Categoria<select v-model="form.category"><option v-for="category in categories" :key="category">{{ category }}</option></select></label><label>Frequência<select v-model="form.frequency"><option v-for="frequency in frequencies" :key="frequency">{{ frequency }}</option></select></label></div>
      <fieldset><legend>Escolha um ícone</legend><div class="icon-picker"><button v-for="icon in icons" :key="icon" type="button" :class="{ selected: form.icon === icon }" @click="form.icon = icon">{{ icon }}</button></div></fieldset>
      <div class="form-actions"><button class="button button--ghost" type="button" @click="emit('cancel')">Cancelar</button><button class="button button--primary" type="submit">{{ habit ? 'Salvar alterações' : 'Adicionar hábito' }}</button></div>
    </form>
  </div>
</template>