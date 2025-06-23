import { ReactNode } from 'react'

export interface ActionButtonProps {
  icon: ReactNode
  title: string
  description: string
  onClick?: () => void
}

export interface ActivityItem {
  id: string
  type: 'prova' | 'questao' | 'banco'
  title: string
  time: string
  icon: ReactNode
}
