import React from 'react';
import { Plus, Upload, Download, BarChart3 } from 'lucide-react';

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  title, 
  description, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md hover:border-slate-300 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
  >
    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </button>
);

export const QuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-71 overflow-auto">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionButton
          icon={<Plus size={20} className="text-slate-600" />}
          title="Nova Prova"
          description="Criar uma nova prova com questões"
        />
        <ActionButton
          icon={<Upload size={20} className="text-slate-600" />}
          title="Importar Questões"
          description="Importar questões de um arquivo"
        />
        <ActionButton
          icon={<Download size={20} className="text-slate-600" />}
          title="Exportar Dados"
          description="Baixar relatórios e estatísticas"
        />
        <ActionButton
          icon={<BarChart3 size={20} className="text-slate-600" />}
          title="Ver Relatórios"
          description="Análise detalhada de desempenho"
        />
      </div>
    </div>
  );
};