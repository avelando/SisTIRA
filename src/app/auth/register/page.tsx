'use client'

import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Zap,
  Shield,
  Sparkles,
} from 'lucide-react';
import styles from '@/styles/AuthPages.module.css';
import GoogleAuthButton from '@/components/ui/GoogleAuthButton';
import FormField from '@/components/ui/FormField';
import LinkPrompt from '@/components/ui/LinkPrompt';
import LoadingButton from '@/components/ui/LoadingButton';
import FeatureList from '@/components/ui/FeatureList';
import BackButton from '@/components/ui/BackButton';

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const features = [
    { icon: <Zap size={24} />, title: 'Configuração Rápida', text: 'Em menos de 5 minutos' },
    { icon: <Shield size={24} />, title: 'Dados Seguros',       text: 'Proteção total' },
    { icon: <Sparkles size={24} />, title: 'IA Avançada',        text: 'Tecnologia de ponta' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateIdentification = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Nome é obrigatório';
    if (!formData.lastName.trim())  newErrors.lastName  = 'Sobrenome é obrigatório';
    if (!formData.username.trim())  newErrors.username  = 'Username é obrigatório';
    else if (formData.username.length < 3) newErrors.username = 'Username deve ter pelo menos 3 caracteres';
    else if (!/^[a-zA-Z0-9_]+$/.test(formData.username))
      newErrors.username = 'Username pode conter apenas letras, números e underscore';
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
    if (validateIdentification()) {
      setCurrentStep('credentials');
      setErrors({});
    }
  };
  const handlePreviousStep = () => {
    setCurrentStep('identification');
    setErrors({});
  };

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

  const handleBackToHome = () => { window.location.href = '/'; };
  const handleGoToLogin  = () => { window.location.href = './login'; };

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <div className={styles.pattern} />
        <div className={styles.contentOverlay}>
          <div className={styles.logoBar}>
            <div className={styles.logoBox}>
              <BookOpen size={24} className={styles.logoIcon} />
            </div>
            <span className={styles.logoText}>SisTIRA</span>
          </div>

          <div className={styles.welcome}>
            <h1 className={styles.welcomeTitle}>
              {currentStep === 'identification' ? 'Junte-se ao' : 'Complete suas'}
              <span className={styles.welcomeHighlight}>SisTIRA</span>
            </h1>
            <p className={styles.welcomeText}>
              {currentStep === 'identification'
                ? 'Comece sua jornada na criação de avaliações inteligentes. Transforme a forma como você ensina e avalia.'
                : 'Informe seus dados de acesso para concluir o cadastro.'}
            </p>
          </div>

          <FeatureList features={features} />

          <div className={styles.progressIndicator}>
            <div className={styles.stepBar}>
              <div className={`${styles.stepCircle} ${currentStep === 'identification' ? styles.active : ''}`}>1</div>
              <div className={`${styles.stepLine}   ${currentStep === 'credentials'    ? styles.activeLine : ''}`}/>
              <div className={`${styles.stepCircle} ${currentStep === 'credentials'    ? styles.active : ''}`}>2</div>
            </div>
            <div className={styles.stepLabels}>
              <span>Identificação</span>
              <span>Credenciais</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <BackButton onClick={handleBackToHome} />

        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Criar Conta</h2>
            <p className={styles.formSubtitle}>
              Etapa {currentStep === 'identification' ? 1 : 2} de 2
            </p>
          </div>

          {currentStep === 'identification' ? (
            <div className={styles.formStep}>
              <GoogleAuthButton content="Criar conta com o google" />

              <div className={styles.divider}>
                <div className={styles.line} />ou<div className={styles.line} />
              </div>

              <FormField
                label="Nome"
                icon={<User size={20} />}
                value={formData.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
                error={errors.firstName}
                placeholder="Seu nome"
              />

              <FormField
                label="Sobrenome"
                icon={<User size={20} />}
                value={formData.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
                error={errors.lastName}
                placeholder="Seu sobrenome"
              />

              <FormField
                label="Nome de usuário"
                prefix="@"
                value={formData.username}
                onChange={e => handleInputChange('username', e.target.value)}
                error={errors.username}
                placeholder="username"
              />

              <LoadingButton
                onClick={handleNextStep}
                loading={loading}
                className={styles.nextBtn}
              >
                Próximo <ArrowRight size={20} />
              </LoadingButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <FormField
                label="Email"
                icon={<Mail size={20} />}
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                error={errors.email}
                placeholder="email@example.com"
              />

              <FormField
                label="Senha"
                icon={<Lock size={20} />}
                isPassword
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                error={errors.password}
                placeholder="Sua senha"
              />

              <FormField
                label="Confirmar senha"
                icon={<Lock size={20} />}
                isPassword
                value={formData.confirmPassword}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                placeholder="Confirmar a senha"
              />

              <LoadingButton
                type="submit"
                loading={loading}
                className={styles.submitBtn}
              >
                Cadastrar
              </LoadingButton>
            </form>
          )}

          <div className={styles.switchPrompt}>
            {currentStep === 'identification' ? (
              <LinkPrompt
                prompt="Já possui uma conta?"
                linkText="Entrar"
                onClick={handleGoToLogin}
                className={styles.linkPrompt}
              />
            ) : (
              <button onClick={handlePreviousStep} className={styles.backStepBtn}>
                <ArrowLeft size={16} /> Voltar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
