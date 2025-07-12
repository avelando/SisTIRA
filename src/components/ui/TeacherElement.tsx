'use client'

import React from 'react'
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react'
import styles from '@/styles/TeacherElement.module.css'

export const TeacherElement: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.bgCircle} />

        <div className={styles.centerCircle}>
          <BookOpen size={80} className="text-white" />
        </div>

        <div className={styles.float1}>
          <Users size={24} className="text-[#133856]" />
        </div>

        <div className={styles.float2}>
          <Award size={24} className="text-blue-500" />
        </div>

        <div className={styles.float3}>
          <TrendingUp size={20} className="text-green-500" />
        </div>

        <div className={styles.float4}>
          <span className={styles.aiText}>AI</span>
        </div>

        <div>
          <div className={styles.dot1} />
          <div className={styles.dot2} />
          <div className={styles.dot3} />
        </div>
      </div>

      <div className={styles.decor1} />
      <div className={styles.decor2} />
    </div>
  )
}
