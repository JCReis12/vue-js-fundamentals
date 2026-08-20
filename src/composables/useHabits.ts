import { computed, ref, watch } from 'vue'
import { exampleHabits } from '../data/habits'
import type { Habit, HabitDraft } from '../types/habit'

const STORAGE_KEY = 'habit-flow-habits'
const habits = ref<Habit[]>([])
let initialized = false

const dateKey = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const loadHabits = () => {
  if (initialized) return
  initialized = true
  const stored = localStorage.getItem(STORAGE_KEY)
  habits.value = stored ? JSON.parse(stored) : exampleHabits.map((habit) => ({ ...habit, completedDates: [...habit.completedDates] }))
}

const saveHabits = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(habits.value))
watch(habits, saveHabits, { deep: true })

const calculateStreak = (habit: Habit) => {
  let streak = 0
  const cursor = new Date()
  while (habit.completedDates.includes(dateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

const calculateCompletionRate = (habit: Habit) => Math.min(100, Math.round((habit.completedDates.length / Math.max(1, daysSince(habit.createdAt))) * 100))
const daysSince = (createdAt: string) => Math.max(1, Math.floor((Date.now() - new Date(`${createdAt}T00:00:00`).getTime()) / 86400000) + 1)

const addHabit = (draft: HabitDraft) => {
  habits.value.unshift({ ...draft, id: crypto.randomUUID(), createdAt: dateKey(), completedDates: [], bestStreak: 0 })
}
const updateHabit = (id: string, draft: HabitDraft) => {
  const habit = habits.value.find((item) => item.id === id)
  if (habit) Object.assign(habit, draft)
}
const deleteHabit = (id: string) => { habits.value = habits.value.filter((habit) => habit.id !== id) }
const toggleHabit = (id: string) => {
  const habit = habits.value.find((item) => item.id === id)
  if (!habit) return
  const today = dateKey()
  const index = habit.completedDates.indexOf(today)
  if (index >= 0) habit.completedDates.splice(index, 1)
  else habit.completedDates.push(today)
  habit.bestStreak = Math.max(habit.bestStreak, calculateStreak(habit))
}
const getHabitById = (id: string) => habits.value.find((habit) => habit.id === id)
const restoreExamples = () => { habits.value = exampleHabits.map((habit) => ({ ...habit, completedDates: [...habit.completedDates] })) }

export const useHabits = () => {
  loadHabits()
  const today = computed(() => dateKey())
  return { habits, today, addHabit, updateHabit, deleteHabit, toggleHabit, getHabitById, loadHabits, saveHabits, calculateStreak, calculateCompletionRate, restoreExamples }
}