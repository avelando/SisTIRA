import api from '@/lib/axios'
import type {
  ExamForResponse,
  SubmitResponseDto,
  SubmitResponseResult,
  ExamResponseResult,
} from '@/interfaces/ExamsProps'

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

export const getExamForResponse = async (
  identifier: string,
  accessCode?: string,
): Promise<ExamForResponse> => {
  if (!identifier) throw new Error('getExamForResponse: identifier inválido')
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
  if (!examId) throw new Error('checkExamAccess: id inválido')
  const { data } = await api.get<{ hasAccess: boolean }>(`/exams/${examId}/access`)
  return data
}

export const grantExamAccess = async (
  examId: string,
  accessCode: string
): Promise<{ success: boolean }> => {
  if (!examId || !accessCode) throw new Error('grantExamAccess: parâmetros inválidos')
  const { data } = await api.post<{ success: boolean }>(
    `/exams/${examId}/access`,
    { accessCode }
  )
  return data
}

export const getExamForResponseAuth = async (examId: string): Promise<ExamForResponse> => {
  if (!examId) throw new Error('getExamForResponseAuth: id inválido')
  const { data } = await api.get<ExamForResponse>(`/exams/${examId}/respond-auth`)
  return data
}

export const getResponseResult = async (responseId: string): Promise<ExamResponseResult> => {
  if (!responseId) throw new Error('getResponseResult: responseId inválido')
  const { data } = await api.get<ExamResponseResult>(
    `/exams/responses/${encodeURIComponent(responseId)}`
  )
  return data
}

export const getExamResponses = async (examId: string): Promise<ExamResponseResult[]> => {
  if (!examId) throw new Error('getExamResponses: id inválido')
  const { data } = await api.get<ExamResponseResult[]>(`/exams/${examId}/responses`)
  return data
}

export const gradeExamAnswer = async (
  answerId: string,
  payload: { teacherScore?: number | null; teacherFeedback?: string | null }
): Promise<{ id: string; teacherScore: number | null; teacherFeedback: string | null }> => {
  const { data } = await api.patch(`/exams/answers/${answerId}/grade`, payload)
  return data
}

export interface ShareLinkOptions {
  baseUrl?: string
  preferCodeIdentifier?: boolean
}

export async function getMyResponseStatus(examId: string) {
  const { data } = await api.get<{
    hasResponded: boolean
    latestResponseId: string | null
    allowMultipleResponses: boolean
  }>(`/exams/${encodeURIComponent(examId)}/my-response-status`)
  return data
}

export const buildExamShareLink = (
  examId: string,
  settings: ExamSettings | null | undefined,
  opts: ShareLinkOptions = {}
) => {
  const { baseUrl = '', preferCodeIdentifier = false } = opts

  const visibility = settings?.visibility ?? 'PRIVATE'
  const hasCode = Boolean(settings?.accessCode)
  const isPrivate = hasCode || visibility !== 'PUBLIC'
  const make = (identifier: string) =>
    `${baseUrl}/respond/${encodeURIComponent(identifier)}`
  let url = make(examId)
  let usingIdentifier: 'examId' | 'accessCode' = 'examId'
  if (preferCodeIdentifier && hasCode) {
    url = make(settings!.accessCode as string)
    usingIdentifier = 'accessCode'
  }
  return { url, isPrivate, usingIdentifier }
}
