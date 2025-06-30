import api from '@/lib/axios'
import {
  ExamPayload,
  FullExam,
  ExamForResponse,
  SubmitResponseDto
} from '@/interfaces/ExamsProps'
import { CountsResponse } from '@/interfaces/CountsResponse'

export const getExams = async (): Promise<FullExam[]> => {
  const { data } = await api.get<FullExam[]>('/exams')
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

export const updateExam = async (
  id: string,
  payload: ExamPayload
): Promise<FullExam> => {
  if (!id) throw new Error('updateExam: id inválido')
  const { data } = await api.put<FullExam>(`/exams/${id}`, payload)
  return data
}

export const deleteExam = async (id: string): Promise<{ message: string }> => {
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
  examId: string
): Promise<ExamForResponse> => {
  if (!examId) throw new Error('getExamForResponse: id inválido')
  const { data } = await api.get<ExamForResponse>(
    `/exams/respond/${examId}`,
    { withCredentials: true }
  )
  return data
}

export const submitExamResponse = async (
  payload: SubmitResponseDto
): Promise<void> => {
  await api.post('/exams/respond', payload, { withCredentials: true })
}

export const checkExamAccess = async (
  examId: string
): Promise<{ hasAccess: boolean }> => {
  if (!examId) throw new Error('checkExamAccess: id inválido')
  const { data } = await api.get<{ hasAccess: boolean }>(
    `/exams/${examId}/check-access`,
    { withCredentials: true }
  )
  return data
}

export const grantExamAccess = async (
  examId: string,
  accessCode: string
): Promise<ExamForResponse> => {
  if (!examId) throw new Error('grantExamAccess: id inválido')
  const { data } = await api.post<ExamForResponse>(
    `/exams/${examId}/grant-access`,
    { accessCode },
    { withCredentials: true }
  )
  return data
}

export const getExamForResponseAuth = async (
  examId: string
): Promise<ExamForResponse> => {
  if (!examId) throw new Error('getExamForResponseAuth: id inválido')
  const { data } = await api.get<ExamForResponse>(
    `/exams/${examId}/respond-auth`,
    { withCredentials: true }
  )
  return data
}
