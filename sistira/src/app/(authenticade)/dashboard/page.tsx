// src/app/(authenticate)/dashboard/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/Dashboard.module.css'
import { checkAuth } from '@/api/auth'
import { useRouter } from 'next/navigation'
import { UserProps } from '@/interfaces/UserProps'
import Card from '@/components/ui/Card'
import { ExamsIcon, QuestionsBankIcon, QuestionsIcon, RoomsIcon } from '@/lib/images'
import { getUserCounts } from '@/api/exams'
import type { CountsResponse } from '@/interfaces/CountsResponse'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProps | null>(null)
  const [counts, setCounts] = useState<CountsResponse | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await checkAuth()
        if (!userData) return router.push('/auth/login')
        setUser(userData)

        const cnt = await getUserCounts()
        setCounts(cnt)
      } catch (error) {
        console.error(error)
        router.push('/auth/login')
      }
    }
    fetchData()
  }, [router])

  if (!user || !counts) return null

  return (
    <div className={styles.grid}>
      <Card
        title="Provas"
        quant={counts.examsCount}
        icon={<ExamsIcon />}
        bgColor="#FFE3A9"
      />
      <Card
        title="Banco de Questões"
        quant={counts.banksCount}
        icon={<QuestionsBankIcon />}
        bgColor="#FFD7D7"
      />
      <Card
        title="Questões"
        quant={counts.questionsCount}
        icon={<QuestionsIcon />}
        bgColor="#CFF7D1"
      />
      {/* <Card 
        title="Salas" 
        quant={5} 
        icon={<RoomsIcon />} 
        bgColor="#E3D9FF" 
      /> */}
    </div>
  )
}
