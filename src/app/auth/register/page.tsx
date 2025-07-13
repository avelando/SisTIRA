'use client'

import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Chrome,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Zap,
  Shield,
  Sparkles,
} from 'lucide-react';
import styles from '@/styles/SignupPage.module.css';

type SignupStep = 'identification' | 'credentials';

const Signup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SignupStep>('identification');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateIdentification = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Nome é obrigatório';
    if (!formData.lastName.trim()) newErrors.lastName = 'Sobrenome é obrigatório';
    if (!formData.username.trim()) newErrors.username = 'Username é obrigatório';
    else if (formData.username.length < 3) newErrors.username = 'Username deve ter pelo menos 3 caracteres';
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) newErrors.username = 'Username pode conter apenas letras, números e underscore';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCredentials = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 8) newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Senhas não coincidem';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateIdentification()) setCurrentStep('credentials');
  };
  const handlePreviousStep = () => setCurrentStep('identification');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCredentials()) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      window.location.href = '/dashboard';
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      window.location.href = '/dashboard';
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => { window.location.href = '/'; };
  const handleGoToLogin = () => { window.location.href = './login'; };

  return (
    <div className={styles.root}>
      <aside className={styles.leftSide}>
        <div className={styles.pattern} />
        <div className={styles.overlay}>
          <div className={styles.logoBar}>
            <div className={styles.logoBox}><BookOpen size={24} className={styles.logoIcon} /></div>
            <span className={styles.logoText}>SisTIRA</span>
          </div>
          <div className={styles.welcome}>
            <h1 className={styles.welcomeTitle}>
              {currentStep === 'identification' ? 'Junte-se ao' : 'Continue em'}
              <span className={styles.welcomeHighlight}>SisTIRA</span>
            </h1>
            <p className={styles.welcomeText}>
              {currentStep === 'identification'
                ? 'Comece sua jornada na criação de avaliações inteligentes. Transforme a forma como você ensina e avalia.'
                : 'Complete suas credenciais para acessar todos os recursos'}
            </p>
          </div>
          <div className={styles.benefits}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}><Zap size={24} /></div>
              <div>
                <h3 className={styles.benefitTitle}>Configuração Rápida</h3>
                <p className={styles.benefitText}>Em menos de 5 minutos</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}><Shield size={24} /></div>
              <div>
                <h3 className={styles.benefitTitle}>Dados Seguros</h3>
                <p className={styles.benefitText}>Proteção total</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}><Sparkles size={24} /></div>
              <div>
                <h3 className={styles.benefitTitle}>IA Avançada</h3>
                <p className={styles.benefitText}>Tecnologia de ponta</p>
              </div>
            </div>
          </div>
          <div className={styles.progressIndicator}>
            <div className={styles.stepBar}>
              <div className={`${styles.stepCircle} ${currentStep === 'identification' ? styles.active : ''}`}>1</div>
              <div className={`${styles.stepLine} ${currentStep === 'credentials' ? styles.activeLine : ''}`} />
              <div className={`${styles.stepCircle} ${currentStep === 'credentials' ? styles.active : ''}`}>2</div>
            </div>
            <div className={styles.stepLabels}>
              <span>Identificação</span><span>Credenciais</span>
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.rightSide}>
        <div className={styles.backWrapper}>
          <button onClick={handleBackToHome} className={styles.backBtn}>
            <ArrowLeft size={20} /> Voltar ao início
          </button>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Criar Conta</h2>
            <p className={styles.formSubtitle}>Etapa {currentStep === 'identification' ? 1 : 2} de 2</p>
          </div>

          {currentStep === 'identification' ? (
            <> 
              <button onClick={handleGoogleSignup} disabled={loading} className={styles.googleBtn}>
                <Chrome size={20} className={styles.googleIcon} /> Continuar com Google
              </button>
              <div className={styles.divider}><div className={styles.line} />ou<div className={styles.line} /></div>
              <div className={styles.formStep}>
                <div className={styles.field}>
                  <label className={styles.label}>Nome</label>
                  <div className={styles.inputWrapper}>
                    <User size={20} className={styles.inputIcon} />
                    <input type="text" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} placeholder="Seu nome" className={`${styles.input} ${errors.firstName ? styles.error : ''}`} />
                  </div>
                  {errors.firstName && <p className={styles.errorText}>{errors.firstName}</p>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Sobrenome</label>
                  <div className={styles.inputWrapper}>
                    <User size={20} className={styles.inputIcon} />
                    <input type="text" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} placeholder="Seu sobrenome" className={`${styles.input} ${errors.lastName ? styles.error : ''}`} />
                  </div>
                  {errors.lastName && <p className={styles.errorText}>{errors.lastName}</p>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Username</label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.usernamePrefix}>@</span>
                    <input type="text" value={formData.username} onChange={e => handleInputChange('username', e.target.value.toLowerCase())} placeholder="username" className={`${styles.input} ${errors.username ? styles.error : ''}`} />
                  </div>
                  {errors.username && <p className={styles.errorText}>{errors.username}</p>}
                </div>
                <button onClick={handleNextStep} className={styles.nextBtn}>
                  Próximo <ArrowRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit} className={styles.form}>...
              </form>
            </>
          )}

          <div className={styles.switchPrompt}>
            {currentStep === 'identification' ? (
              <p>Já tem uma conta? <button onClick={handleGoToLogin} className={styles.linkBtn}>Entrar</button></p>
            ) : (
              <button onClick={handlePreviousStep} className={styles.backStepBtn}><ArrowLeft size={16} /> Voltar</button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
