export const isSubjectiveType = (t?: string) =>
  t === 'SUBJECTIVE' || t === 'SUB';

export const isObjectiveType = (t?: string) =>
  t === 'OBJECTIVE' ||
  t === 'OBJ' ||
  t === 'MULTIPLE_CHOICE_SINGLE' ||
  t === 'TRUE_FALSE' ||
  t === 'MULTIPLE_CHOICE_MULTI';
