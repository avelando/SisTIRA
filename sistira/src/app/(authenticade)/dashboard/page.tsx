'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/Dashboard.module.css'
import { checkAuth } from '@/api/auth'
import { useRouter } from 'next/navigation'
import { UserProps } from '@/interfaces/UserProps'
import Card from '@/components/ui/Card'
import { ExamsIcon, QuestionsBankIcon, QuestionsIcon } from '@/lib/images'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProps | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await checkAuth()
        if (!userData) router.push('/auth/login')
        else setUser(userData)
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        router.push('/auth/login')
      }
    }

    fetchUser()
  }, [router])

  if (!user) return null;

  return (
    <div className={styles.grid}>
      <Card title="Provas" quant={23} icon={<ExamsIcon />} bgColor="#FFE3A9" />
      <Card title="Banco de Questões" quant={4} icon={<QuestionsBankIcon />} bgColor="#FFD7D7" />
      <Card title="Questões" quant={132} icon={<QuestionsIcon />} bgColor="#CFF7D1" />
      {/* <Card title="Salas" quant={5} icon={<RoomsIcon />} bgColor="#E3D9FF" /> */}
    </div>
  )
}
