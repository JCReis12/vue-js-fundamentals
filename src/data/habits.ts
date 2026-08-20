import type { Habit } from '../types/habit'

export const exampleHabits: Habit[] = [
  { id: 'water', name: 'Beber 2L de água', description: 'Manter o corpo hidratado durante o dia.', category: 'Saúde', frequency: 'Diário', icon: '💧', createdAt: '2026-08-01', completedDates: [], bestStreak: 5 },
  { id: 'code', name: 'Estudar programação', description: 'Praticar Vue e construir algo novo.', category: 'Estudos', frequency: 'Diário', icon: '⌨', createdAt: '2026-08-04', completedDates: [], bestStreak: 12 },
  { id: 'exercise', name: 'Fazer exercícios', description: 'Movimentar o corpo por pelo menos 30 minutos.', category: 'Exercícios', frequency: 'Diário', icon: '◒', createdAt: '2026-07-22', completedDates: [], bestStreak: 8 },
  { id: 'read', name: 'Ler 20 páginas', description: 'Desacelerar com uma boa leitura.', category: 'Pessoal', frequency: 'Diário', icon: '▤', createdAt: '2026-08-08', completedDates: [], bestStreak: 4 },
  { id: 'sleep', name: 'Dormir 8 horas', description: 'Preparar uma noite tranquila e restauradora.', category: 'Saúde', frequency: 'Diário', icon: '☾', createdAt: '2026-07-30', completedDates: [], bestStreak: 7 },
]