import api from '@/lib/axios'
import { ExamPayload, FullExam } from '@/interfaces/ExamsProps'
import { CountsResponse } from '@/interfaces/CountsResponse'

export type Visibility = 'PUBLIC' | 'PRIVATE'
export type ResultsVisibility = 'IMMEDIATE' | 'WHEN_TEACHER_RELEASES' | 'AT_DATE'

export interface ExamSettings {
  accessCode?: string | null
  visibility?: Visibility
  startsAt?: string | null
  endsAt?: string | null
  timeLimitInMinutes?: number | null
  allowResponseEdit?: boolean
  resultsVisibility?: ResultsVisibility
  resultsReleaseAt?: string | null
}

export interface RawExam {
  id: string
  title: string
  createdAt: string
  _count: { questions: number }
}

export const getExams = async (): Promise<RawExam[]> => {
  const { data } = await api.get<RawExam[]>('/exams')
  return data
}

export const getExam = async (id: string): Promise<FullExam> => {
  if (!id) throw new Error('getExam: id inválido')
  const { data } = await api.get<FullExam>(`/exams/${id}`)
  return data
}

export const createExam = async (payload: ExamPayload): Promise<FullExam> => {
  const { data } = await api.post<FullExam>('/exams', payload)
  return data
}

export const updateExam = async (id: string, payload: ExamPayload): Promise<FullExam> => {
  if (!id) throw new Error('updateExam: id inválido')
  const { data } = await api.patch<FullExam>(`/exams/${id}`, payload)
  return data
}

export const deleteExam = async <T = any>(id: string): Promise<T> => {
  if (!id) throw new Error('deleteExam: id inválido')
  const { data } = await api.delete<T>(`/exams/${id}`)
  return data
}

export const addQuestionsToExam = async (
  examId: string,
  questions: string[]
): Promise<FullExam> => {
  if (!examId) throw new Error('addQuestionsToExam: id inválido')
  const { data } = await api.patch<FullExam>(`/exams/${examId}/add-questions`, { questions })
  return data
}

export const removeQuestionsFromExam = async (
  examId: string,
  questions: string[]
): Promise<FullExam> => {
  if (!examId) throw new Error('removeQuestionsFromExam: id inválido')
  const { data } = await api.patch<FullExam>(`/exams/${examId}/remove-questions`, { questions })
  return data
}

export const addBanksToExam = async (
  examId: string,
  bankIds: string[]
): Promise<FullExam> => {
  if (!examId) throw new Error('addBanksToExam: id inválido')
  const { data } = await api.patch<FullExam>(`/exams/${examId}/add-banks`, { bankIds })
  return data
}

export const removeBanksFromExam = async (
  examId: string,
  bankIds: string[]
): Promise<FullExam> => {
  if (!examId) throw new Error('removeBanksFromExam: id inválido')
  const { data } = await api.patch<FullExam>(`/exams/${examId}/remove-banks`, { bankIds })
  return data
}

export const getUserCounts = async (): Promise<CountsResponse> => {
  const { data } = await api.get<CountsResponse>('/exams/counts')
  return data
}

export const getExamSettings = async (examId: string): Promise<ExamSettings | null> => {
  if (!examId) throw new Error('getExamSettings: id inválido')
  const { data } = await api.get<ExamSettings | null>(`/exams/${examId}/settings`)
  return data
}

export const updateExamSettings = async (
  examId: string,
  dto: Partial<ExamSettings> & {
    generateAccessCode?: boolean
    clearAccessCode?: boolean
    customAccessCode?: string
  }
): Promise<ExamSettings> => {
  if (!examId) throw new Error('updateExamSettings: id inválido')
  const { data } = await api.patch<ExamSettings>(`/exams/${examId}/settings`, dto)
  return data
}

export const generateExamAccessCode = async (
  examId: string,
  length?: number
): Promise<{ accessCode: string }> => {
  if (!examId) throw new Error('generateExamAccessCode: id inválido')
  const body = typeof length === 'number' ? { length } : {}
  const { data } = await api.post<{ accessCode: string }>(
    `/exams/${examId}/settings/access-code/generate`,
    body
  )
  return data
}

export const setExamCustomAccessCode = async (
  examId: string,
  code: string
): Promise<{ accessCode: string }> => {
  if (!examId) throw new Error('setExamCustomAccessCode: id inválido')
  const { data } = await api.patch<{ accessCode: string }>(
    `/exams/${examId}/settings/access-code`,
    { code }
  )
  return data
}

export const clearExamAccessCode = async (
  examId: string
): Promise<{ accessCode: null }> => {
  if (!examId) throw new Error('clearExamAccessCode: id inválido')
  const { data } = await api.delete<{ accessCode: null }>(
    `/exams/${examId}/settings/access-code`
  )
  return data
}

export const setExamVisibility = async (
  examId: string,
  visibility: Visibility
): Promise<{ visibility: Visibility }> => {
  if (!examId) throw new Error('setExamVisibility: id inválido')
  const { data } = await api.patch<{ visibility: Visibility }>(
    `/exams/${examId}/settings/visibility`,
    { visibility }
  )
  return data
}
