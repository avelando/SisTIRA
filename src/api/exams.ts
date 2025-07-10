import api from '@/lib/axios'
import {
  ExamPayload,
  FullExam,
  ExamForResponse,
  SubmitResponseDto,
  SubmitResponseResult,
} from '@/interfaces/ExamsProps'
import { CountsResponse } from '@/interfaces/CountsResponse'

import { ExamResponseResult } from '@/interfaces/ExamsProps'

export interface RawExam {
  id: string
  title: string
  createdAt: string
  _count: { questions: number }
}

export interface ExamAnswerResult {
  id: string
  question: { text: string; questionType: 'OBJ' | 'SUB' }
  alternative?: { content: string }
  subjectiveText?: string
  score?: number
  feedback?: string
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

export const createExam = async (
  payload: ExamPayload
): Promise<FullExam> => {
  const { data } = await api.post<FullExam>('/exams', payload)
  return data
}

export const updateExam = async (
  id: string,
  payload: ExamPayload
): Promise<FullExam> => {
  if (!id) throw new Error('updateExam: id inválido')
  const { data } = await api.put<FullExam>(`/exams/${id}`, payload)
  return data
}

export const deleteExam = async (
  id: string
): Promise<{ message: string }> => {
  if (!id) throw new Error('deleteExam: id inválido')
  const { data } = await api.delete<{ message: string }>(`/exams/${id}`)
  return data
}

export const addQuestionsToExam = async (
  examId: string,
  questions: string[]
): Promise<FullExam> => {
  if (!examId) throw new Error('addQuestionsToExam: id inválido')
  const { data } = await api.patch<FullExam>(
    `/exams/${examId}/add-questions`,
    { questions }
  )
  return data
}

export const removeQuestionsFromExam = async (
  examId: string,
  questions: string[]
): Promise<FullExam> => {
  if (!examId) throw new Error('removeQuestionsFromExam: id inválido')
  const { data } = await api.delete<FullExam>(
    `/exams/${examId}/remove-questions`,
    { data: { questions } }
  )
  return data
}

export const addBanksToExam = async (
  examId: string,
  bankIds: string[]
): Promise<FullExam> => {
  if (!examId) throw new Error('addBanksToExam: id inválido')
  const { data } = await api.patch<FullExam>(
    `/exams/${examId}/add-banks`,
    { bankIds }
  )
  return data
}

export const removeBanksFromExam = async (
  examId: string,
  bankIds: string[]
): Promise<FullExam> => {
  if (!examId) throw new Error('removeBanksFromExam: id inválido')
  const { data } = await api.patch<FullExam>(
    `/exams/${examId}/remove-banks`,
    { bankIds }
  )
  return data
}

export const getUserCounts = async (): Promise<CountsResponse> => {
  const { data } = await api.get<CountsResponse>('/exams/counts')
  return data
}

export const getExamForResponse = async (
  identifier: string,
  accessCode?: string,
): Promise<ExamForResponse> => {
  const { data } = await api.get<ExamForResponse>(
    `/exams/respond/${encodeURIComponent(identifier)}`,
    { params: accessCode ? { accessCode } : {} }
  )
  return data
}

export const submitExamResponse = async (
  payload: SubmitResponseDto
): Promise<SubmitResponseResult> => {
  const { data } = await api.post<SubmitResponseResult>('/exams/respond', payload)
  return data
}

export const checkExamAccess = async (
  examId: string
): Promise<{ hasAccess: boolean }> => {
  const { data } = await api.get<{ hasAccess: boolean }>(
    `/exams/${examId}/access`
  )
  return data
}

export const grantExamAccess = async (
  examId: string,
  accessCode: string
): Promise<{ success: boolean }> => {
  const { data } = await api.post<{ success: boolean }>(
    `/exams/${examId}/access`,
    { accessCode }
  )
  return data
}

export const getExamForResponseAuth = async (
  examId: string
): Promise<ExamForResponse> => {
  const { data } = await api.get<ExamForResponse>(
    `/exams/${examId}/respond-auth`
  )
  return data
}

export const getResponseResult = async (
  responseId: string
): Promise<ExamResponseResult> => {
  if (!responseId) throw new Error('responseId inválido')
  const { data } = await api.get<ExamResponseResult>(
    `/exams/responses/${encodeURIComponent(responseId)}`
  )
  return data
}

export const getExamResponses = async (examId: string): Promise<ExamResponseResult[]> => {
  const { data } = await api.get<ExamResponseResult[]>(`/exams/${examId}/responses`)
  return data
}
