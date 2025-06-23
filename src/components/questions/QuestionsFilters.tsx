import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useDisciplines } from '@/hooks/useDisciplines';

export interface QuestionsFilters {
  search: string;
  questionType: string;
  educationLevel: string;
  difficulty: string;
  disciplineId: string;
}

interface QuestionsFiltersProps {
  filters: QuestionsFilters;
  onFiltersChange: (filters: QuestionsFilters) => void;
  totalQuestions: number;
}

export const QuestionsFiltersComponent: React.FC<QuestionsFiltersProps> = ({
  filters,
  onFiltersChange,
  totalQuestions,
}) => {
  const { disciplines } = useDisciplines();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key: keyof QuestionsFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () =>
    onFiltersChange({
      search: '',
      questionType: '',
      educationLevel: '',
      difficulty: '',
      disciplineId: '',
    });

  const hasActiveFilters =
    !!filters.questionType ||
    !!filters.educationLevel ||
    !!filters.difficulty ||
    !!filters.disciplineId;

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar questões..."
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-colors"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(o => !o)}
            className={`
              flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900
              ${hasActiveFilters
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 hover:bg-slate-50'}
            `}
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filtros</span>
            {hasActiveFilters && (
              <span className="bg-white text-slate-900 text-xs px-1.5 py-0.5 rounded-full font-medium">
                {[
                  filters.questionType,
                  filters.educationLevel,
                  filters.difficulty,
                  filters.disciplineId,
                ].filter(Boolean).length}
              </span>
            )}
          </button>

          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-10">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tipo de Questão
                  </label>
                  <select
                    value={filters.questionType}
                    onChange={e => handleFilterChange('questionType', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none"
                  >
                    <option value="">Todos os tipos</option>
                    <option value="OBJ">Objetiva</option>
                    <option value="SUB">Subjetiva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nível de Ensino
                  </label>
                  <select
                    value={filters.educationLevel}
                    onChange={e => handleFilterChange('educationLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none"
                  >
                    <option value="">Todos os níveis</option>
                    <option value="Ensino Fundamental">Ensino Fundamental</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                    <option value="Pós-graduação">Pós-graduação</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Dificuldade
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={e => handleFilterChange('difficulty', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none"
                  >
                    <option value="">Todas as dificuldades</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Disciplina
                  </label>
                  <select
                    value={filters.disciplineId}
                    onChange={e => handleFilterChange('disciplineId', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none"
                  >
                    <option value="">Todas as disciplinas</option>
                    {disciplines.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-3 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 px-3 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {(hasActiveFilters || filters.search) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.search && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              <span>Busca: "{filters.search}"</span>
              <button
                onClick={() => handleFilterChange('search', '')}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {filters.questionType && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              <span>
                Tipo: {filters.questionType === 'OBJ' ? 'Objetiva' : 'Subjetiva'}
              </span>
              <button
                onClick={() => handleFilterChange('questionType', '')}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {filters.educationLevel && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              <span>Nível: {filters.educationLevel}</span>
              <button
                onClick={() => handleFilterChange('educationLevel', '')}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {filters.difficulty && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              <span>Dificuldade: {filters.difficulty}</span>
              <button
                onClick={() => handleFilterChange('difficulty', '')}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {filters.disciplineId && (
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
              <span>
                Disciplina:{' '}
                {disciplines.find(d => d.id === filters.disciplineId)?.name}
              </span>
              <button
                onClick={() => handleFilterChange('disciplineId', '')}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
