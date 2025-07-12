'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '@/api/auth'
import { getUserCounts } from '@/api/exams'
import type { CountsResponse } from '@/interfaces/CountsResponse'
import { UserProps } from '@/interfaces/UserProps'
import Card from '@/components/ui/Card'
import QuickActions from '@/components/ui/QuickActions'
import {
  ExamsIcon,
  QuestionsBankIcon,
  QuestionsIcon,
} from '@/lib/images'
import { RecentActivity } from '@/components/ui/RecentActivity'
import styles from '@/styles/DashboardPage.module.css'

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
      } catch {
        router.push('/auth/login')
      }
    }
    fetchData()
  }, [router])

  if (!user || !counts) return null

  return (
    <div className={styles.container}>
      <div className={styles.cardGrid}>
        <Card title="Provas" quant={counts.examsCount} icon={<ExamsIcon />} bgColor="yellow" />
        <Card title="Banco de Questões" quant={counts.banksCount} icon={<QuestionsBankIcon />} bgColor="pink" />
        <Card title="Questões" quant={counts.questionsCount} icon={<QuestionsIcon />} bgColor="green" />
      </div>

      <div className={styles.actions}>
        <div className={styles.quickWrapper}>
          <QuickActions />
        </div>
        <div className={styles.recentWrapper}>
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
