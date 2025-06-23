'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '@/api/auth'
import { getUserCounts } from '@/api/exams'
import type { CountsResponse } from '@/interfaces/CountsResponse'
import { UserProps } from '@/interfaces/UserProps'
import Card from '@/components/ui/Card'
import { QuickActions } from '@/components/ui/QuickActions'
import {
  ExamsIcon,
  QuestionsBankIcon,
  QuestionsIcon,
  // RoomsIcon,
} from '@/lib/images'
import { RecentActivity } from '@/components/ui/RecentActivity'

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
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card title="Provas" quant={counts.examsCount} icon={<ExamsIcon />} bgColor="yellow" />
        <Card title="Banco de Questões" quant={counts.banksCount} icon={<QuestionsBankIcon />} bgColor="pink" />
        <Card title="Questões" quant={counts.questionsCount} icon={<QuestionsIcon />} bgColor="green" />
        {/*
        <Card title="Salas" quant={5} icon={<RoomsIcon />} bgColor="pink" />
        */}
      </div>

      <div className="flex items-stretch space-x-6">
        <div className="flex-1 h-full">
          <QuickActions />
        </div>
        <div className="w-1/3 h-full">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
