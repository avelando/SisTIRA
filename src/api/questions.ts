import api from '@/lib/axios';

type ApiQuestionType =
  | 'MULTIPLE_CHOICE_SINGLE'
  | 'MULTIPLE_CHOICE_MULTI'
  | 'TRUE_FALSE'
  | 'SUBJECTIVE';

const API_TYPES = new Set<ApiQuestionType>([
  'MULTIPLE_CHOICE_SINGLE',
  'MULTIPLE_CHOICE_MULTI',
  'TRUE_FALSE',
  'SUBJECTIVE',
]);

function toApiType(t: string): ApiQuestionType {
  if (API_TYPES.has(t as ApiQuestionType)) return t as ApiQuestionType;
  return t === 'SUB' ? 'SUBJECTIVE' : 'MULTIPLE_CHOICE_SINGLE';
}

function buildQuestionPayload(data: any) {
  const { id: _omit, questionType, modelAnswers, ...rest } = data ?? {};
  const apiType = toApiType(questionType);

  const payload: any = { ...rest, questionType: apiType };

  const isSubjective = apiType === 'SUBJECTIVE';
  if (!isSubjective) {
    if (Array.isArray(data?.alternatives)) {
      payload.alternatives = data.alternatives.map((a: any) => ({
        content: a.content,
        correct: !!a.correct,
      }));
    }
    delete payload.modelAnswers;
    delete payload.useModelAnswers;
  } else {
    if (data?.useModelAnswers && Array.isArray(modelAnswers)) {
      payload.useModelAnswers = true;
      payload.modelAnswers = modelAnswers.map((ma: any) => ({
        type: ma.type,
        content: ma.content,
      }));
    } else {
      payload.useModelAnswers = false;
      delete payload.modelAnswers;
    }
    delete payload.alternatives;
  }

  Object.keys(payload).forEach((k) => {
    if (payload[k] === undefined) delete payload[k];
  });

  return payload;
}

export const getQuestions = async () => {
  try {
    const response = await api.get('/questions');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao listar questões.');
  }
};

export const createQuestion = async (data: any) => {
  try {
    const payload = buildQuestionPayload(data);
    const response = await api.post('/questions', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao criar questão.');
  }
};

export const getQuestion = async (id: string) => {
  try {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar questão.');
  }
};

export const updateQuestion = async (id: string, data: any) => {
  try {
    const payload = buildQuestionPayload(data);
    const response = await api.patch(`/questions/${id}`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar questão.');
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    const response = await api.delete(`/questions/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao deletar questão.');
  }
};
