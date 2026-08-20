export type HabitCategory = 'Saúde' | 'Estudos' | 'Trabalho' | 'Exercícios' | 'Pessoal'
export type HabitFrequency = 'Diário' | 'Semanal'

export interface Habit {
  id: string
  name: string
  description: string
  category: HabitCategory
  frequency: HabitFrequency
  icon: string
  createdAt: string
  completedDates: string[]
  bestStreak: number
}

export interface HabitDraft {
  name: string
  description: string
  category: HabitCategory
  frequency: HabitFrequency
  icon: string
}