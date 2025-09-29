'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { getExamResponses, gradeExamAnswer } from '@/api/exam-responses'
import { isObjectiveType } from '@/utils/questionType'
import styles from '@/styles/ExamResponsesPanel.module.css'

interface ExamResponsesPanelProps {
  examId: string
}

type BackendQuestionType =
  | 'SUBJECTIVE'
  | 'MULTIPLE_CHOICE_SINGLE'
  | 'MULTIPLE_CHOICE_MULTI'
  | 'TRUE_FALSE'

type ApiAnswer = {
  id: string
  question: { id: string; text: string; questionType: BackendQuestionType }
  alternative?: { id: string; content: string; correct: boolean } | null
  subjectiveText?: string | null
  aiScore?: number | null
  aiFeedback?: string | null
  teacherScore?: number | null
  teacherFeedback?: string | null
}

type ApiUser = {
  id: string
  username: string
  firstName: string
  lastName: string
}

type ApiResponseRow = {
  id: string
  examId: string
  userId: string
  createdAt: string
  user: ApiUser
  answers: ApiAnswer[]
}

type ViewMode = 'all' | 'by-student' | 'by-question'
type SortKey = 'createdAt' | 'student' | 'questionIndex'

export default function ExamResponsesPanel({ examId }: ExamResponsesPanelProps) {
  const [responses, setResponses] = useState<ApiResponseRow[]>([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<ViewMode>('all')
  const [sortBy, setSortBy] = useState<SortKey>('questionIndex')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Record<
    string,
    { score: string; feedback: string; saving?: boolean }
  >>({})

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      try {
        const data = await getExamResponses(examId)
        setResponses(data as unknown as ApiResponseRow[])
      } finally {
        setLoading(false)
      }
    })()
  }, [examId])

  const questionOrder = useMemo(() => {
    const map = new Map<string, number>()
    const first = responses[0]
    if (first) first.answers.forEach((a, idx) => map.set(a.question.id, idx + 1))
    return map
  }, [responses])

  const allRows = useMemo(() => {
    const rows: Array<{
      respId: string
      user: ApiUser
      createdAt: string
      answer: ApiAnswer
      qIndex: number | null
    }> = []
    for (const r of responses) {
      for (const a of r.answers) {
        rows.push({
          respId: r.id,
          user: r.user,
          createdAt: r.createdAt,
          answer: a,
          qIndex: questionOrder.get(a.question.id) ?? null,
        })
      }
    }
    return rows
  }, [responses, questionOrder])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return allRows
    return allRows.filter(({ user, answer }) => {
      const name = `${user.firstName} ${user.lastName}`.toLowerCase()
      const qtext = answer.question.text.toLowerCase()
      const alt = (answer.alternative?.content ?? '').toLowerCase()
      const subj = (answer.subjectiveText ?? '').toLowerCase()
      return name.includes(q) || qtext.includes(q) || alt.includes(q) || subj.includes(q)
    })
  }, [allRows, search])

  const sorted = useMemo(() => {
    const copy = [...filtered]
    copy.sort((a, b) => {
      if (sortBy === 'questionIndex') {
        const qi = (a.qIndex ?? 1e9) - (b.qIndex ?? 1e9)
        if (qi !== 0) return qi
      }
      if (sortBy === 'student') {
        const n1 = `${a.user.firstName} ${a.user.lastName}`.toLowerCase()
        const n2 = `${b.user.firstName} ${b.user.lastName}`.toLowerCase()
        const cmp = n1.localeCompare(n2)
        if (cmp !== 0) return cmp
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
    return copy
  }, [filtered, sortBy])

  const byStudent = useMemo(() => {
    const m = new Map<string, { user: ApiUser; rows: typeof sorted }>()
    for (const row of sorted) {
      if (!m.has(row.user.id)) m.set(row.user.id, { user: row.user, rows: [] as any })
      m.get(row.user.id)!.rows.push(row)
    }
    return Array.from(m.values()).sort((a, b) =>
      `${a.user.firstName} ${a.user.lastName}`.localeCompare(
        `${b.user.firstName} ${b.user.lastName}`,
      ),
    )
  }, [sorted])

  const byQuestion = useMemo(() => {
    const m = new Map<
      string,
      { question: ApiAnswer['question']; qIndex: number | null; rows: typeof sorted }
    >()
    for (const row of sorted) {
      const qid = row.answer.question.id
      if (!m.has(qid)) {
        m.set(qid, { question: row.answer.question, qIndex: row.qIndex, rows: [] as any })
      }
      m.get(qid)!.rows.push(row)
    }
    return Array.from(m.values()).sort((a, b) => (a.qIndex ?? 1e9) - (b.qIndex ?? 1e9))
  }, [sorted])

  const ensureEdit = (ans: ApiAnswer) => {
    setEditing(prev =>
      prev[ans.id]
        ? prev
        : {
            ...prev,
            [ans.id]: {
              score:
                typeof ans.teacherScore === 'number' ? ans.teacherScore.toFixed(1) : '',
              feedback: ans.teacherFeedback ?? '',
            },
          },
    )
  }
  const setEdit = (id: string, patch: Partial<{ score: string; feedback: string }>) =>
    setEditing(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))

  const saveEdit = async (answerId: string) => {
    const ed = editing[answerId]
    if (!ed) return
    const scoreNum =
      ed.score.trim() === '' ? null : Math.max(0, Math.min(1, Number(ed.score)))

    setEditing(prev => ({ ...prev, [answerId]: { ...prev[answerId], saving: true } }))
    try {
      const updated = await gradeExamAnswer(answerId, {
        teacherScore: scoreNum,
        teacherFeedback: ed.feedback ?? null,
      })
      setResponses(prev =>
        prev.map(r => ({
          ...r,
          answers: r.answers.map(a =>
            a.id === answerId
              ? {
                  ...a,
                  teacherScore: updated.teacherScore ?? scoreNum ?? null,
                  teacherFeedback: updated.teacherFeedback ?? ed.feedback ?? null,
                }
              : a,
          ),
        })),
      )
    } catch {
      alert('Falha ao salvar correção.')
    } finally {
      setEditing(prev => ({ ...prev, [answerId]: { ...prev[answerId], saving: false } }))
    }
  }

  const renderRow = (
    row: { user: ApiUser; answer: ApiAnswer; qIndex: number | null },
    opts: { showQuestion: boolean; showStudent: boolean },
  ) => {
    const { answer: ans, user } = row
    const ed = editing[ans.id]
    const obj = isObjectiveType(ans.question.questionType)
    const userFull = `${user.firstName} ${user.lastName}`

    const currentScore =
      typeof ans.teacherScore === 'number' ? ans.teacherScore : ans.aiScore
    const currentFeedback = ans.teacherFeedback ?? ans.aiFeedback

    return (
      <li key={ans.id} className={styles.answerRow}>
        {opts.showQuestion && (
          <div className={styles.qtext}>
            <strong>{row.qIndex ? `Questão ${row.qIndex}` : 'Questão'}:</strong>{' '}
            {ans.question.text}
          </div>
        )}

        {opts.showStudent && (
          <div className={styles.metaLine}>
            <span className={styles.byline}>
              <strong>Aluno:</strong> {userFull}{' '}
              <span className={styles.handle}>@{user.username}</span>
            </span>
          </div>
        )}

        {obj ? (
          <div className={styles.answer}>
            <strong>Resposta objetiva:</strong> {ans.alternative?.content || '–'}
          </div>
        ) : (
          <div className={styles.answer}>
            <strong>Resposta subjetiva:</strong> {ans.subjectiveText || '–'}
          </div>
        )}

        <div className={styles.meta}>
          <span>
            <strong>Nota atual:</strong>{' '}
            {typeof currentScore === 'number' ? currentScore.toFixed(1) : '–'}
            {typeof ans.teacherScore === 'number' && typeof ans.aiScore === 'number' ? (
              <span className={styles.tagOverride}> (professor)</span>
            ) : null}
          </span>
          <span>
            <strong>Feedback:</strong> {currentFeedback ?? '–'}
          </span>
          {typeof ans.aiScore === 'number' && typeof ans.teacherScore === 'number' ? (
            <span className={styles.aiTag}>
              IA: {ans.aiScore.toFixed(1)} — {ans.aiFeedback ?? '–'}
            </span>
          ) : null}
        </div>

        <div className={styles.teacherBox}>
          <div className={styles.teacherInputs}>
            <label className={styles.inlineLabel}>
              Nota (0–1):
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={
                  ed?.score ??
                  (typeof ans.teacherScore === 'number' ? ans.teacherScore.toFixed(1) : '')
                }
                onFocus={() => ensureEdit(ans)}
                onChange={e => setEdit(ans.id, { score: e.target.value })}
                className={styles.input}
              />
            </label>
            <label className={styles.inlineLabel} style={{ flex: 1 }}>
              Feedback:
              <input
                type="text"
                value={ed?.feedback ?? (ans.teacherFeedback ?? '')}
                onFocus={() => ensureEdit(ans)}
                onChange={e => setEdit(ans.id, { feedback: e.target.value })}
                className={styles.input}
                placeholder="Comentário..."
              />
            </label>
            <button
              type="button"
              className={styles.btn}
              onClick={() => saveEdit(ans.id)}
              disabled={!editing[ans.id] || editing[ans.id].saving}
            >
              {editing[ans.id]?.saving ? 'Salvando…' : 'Salvar'}
            </button>
          </div>
        </div>
      </li>
    )
  }

  const body =
    mode === 'all' ? (
      <article className={styles.item}>
        <ul className={styles.answers}>
          {sorted.map(row => renderRow(row, { showQuestion: true, showStudent: true }))}
        </ul>
      </article>
    ) : mode === 'by-student' ? (
      <>
        {byStudent.map(group => (
          <article key={group.user.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <div className={styles.userLine}>
                <strong>
                  {group.user.firstName} {group.user.lastName}
                </strong>
                <span className={styles.handle}>@{group.user.username}</span>
              </div>
            </div>
            <ul className={styles.answers}>
              {group.rows.map(row => renderRow(row, { showQuestion: true, showStudent: false }))}
            </ul>
          </article>
        ))}
      </>
    ) : (
      <>
        {byQuestion.map(group => (
          <article key={group.question.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <div className={styles.userLine}>
                <strong>
                  {group.qIndex ? `Questão ${group.qIndex}` : 'Questão'}:
                </strong>
                &nbsp;{group.question.text}
              </div>
            </div>
            <ul className={styles.answers}>
              {group.rows.map(row => renderRow(row, { showQuestion: false, showStudent: true }))}
            </ul>
          </article>
        ))}
      </>
    )

  return (
    <section className={styles.card} aria-labelledby="responses-title">
      <h2 id="responses-title" className={styles.title}>Respostas</h2>
      <div className={styles.viewCard}>
        <div className={styles.controlsRow}>
          <label className={styles.inlineLabel}>
            Exibir:&nbsp;
            <select
              value={mode}
              onChange={e => setMode(e.target.value as ViewMode)}
              className={styles.select}
            >
              <option value="all">Todas</option>
              <option value="by-student">Por aluno</option>
              <option value="by-question">Por questão</option>
            </select>
          </label>
          <label className={styles.inlineLabel}>
            Ordenar por:&nbsp;
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortKey)}
              className={styles.select}
            >
              <option value="questionIndex"># da questão</option>
              <option value="student">Nome do aluno</option>
              <option value="createdAt">Data de envio</option>
            </select>
          </label>
          <input
            className={styles.search}
            placeholder="Buscar por aluno/questão/resposta…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <p className={styles.muted}>Carregando respostas…</p>
      ) : responses.length === 0 ? (
        <p className={styles.muted}>Nenhuma resposta enviada ainda.</p>
      ) : (
        <div className={styles.list}>{body}</div>
      )}
    </section>
  )
}
