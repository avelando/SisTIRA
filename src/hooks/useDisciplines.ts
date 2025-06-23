import { useState, useEffect } from 'react'
import { Discipline } from '@/interfaces/QuestionProps'

const mockDisciplines: Discipline[] = [
  { id: '1', name: 'Química' },
  { id: '2', name: 'Biologia' },
  { id: '3', name: 'Matemática' },
  { id: '4', name: 'Física' },
  { id: '5', name: 'História' },
  { id: '6', name: 'Geografia' },
  { id: '7', name: 'Português' },
  { id: '8', name: 'Literatura' },
  { id: '9', name: 'Inglês' },
  { id: '10', name: 'Filosofia' },
]

export function useDisciplines() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        setDisciplines(mockDisciplines)
      } catch (err) {
        console.error('Erro ao buscar disciplinas:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDisciplines()
  }, [])

  return { disciplines, loading }
}
