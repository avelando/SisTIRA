'use client';

import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Chrome,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Users,
  Award,
} from 'lucide-react';
import styles from '@/styles/AuthPages.module.css';
import GoogleAuthButton from '@/components/ui/GoogleAuthButton';
import FormField from '@/components/ui/FormField';
import LinkPrompt from '@/components/ui/LinkPrompt';
import LoadingButton from '@/components/ui/LoadingButton';
import FeatureList from '@/components/ui/FeatureList';
import BackButton from '@/components/ui/BackButton';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const features = [
    {
      icon: <CheckCircle size={24} />,
      title: 'Correção Automática',
      text: 'IA avançada para correção de questões',
    },
    {
      icon: <Users size={24} />,
      title: 'Gestão Completa',
      text: 'Organize provas e questões facilmente',
    },
    {
      icon: <Award size={24} />,
      title: 'Relatórios Detalhados',
      text: 'Análises completas de desempenho',
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      window.location.href = '/dashboard';
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => window.location.href = '/';
  const handleGoToSignup = () => window.location.href = './register';
  const handleForgotPassword = () => console.log('Navigate to forgot password');

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
              Bem-vindo de volta ao
              <span className={styles.welcomeHighlight}>SisTIRA</span>
            </h1>
            <p className={styles.welcomeText}>
              Continue sua jornada na criação de avaliações inteligentes e automatizadas com nossa plataforma de tutoria.
            </p>
          </div>
          <FeatureList features={features} />
          <div className={styles.statsGrid}>
            {[{ v: '1000', l: 'Questões' }, { v: '500', l: 'Provas' }, { v: '98%', l: 'Satisfação' }].map((s, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statValue}>{s.v}</div>
                <div className={styles.statLabel}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <BackButton onClick={handleBackToHome} />
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Entrar na conta</h2>
            <p className={styles.formSubtitle}>Acesse sua conta para continuar</p>
          </div>
          <div className={styles.formStep}>
            <GoogleAuthButton content={'Criar conta com o google'} />
            <div className={styles.divider}>
              <div className={styles.line} />ou<div className={styles.line} />
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <FormField
                  label="Email"
                  icon={<Mail size={20} />}
                  placeholder="email@example.com"
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
              </div>
              <div>
                <FormField
                  label="Senha"
                  icon={<Lock size={20} />}
                  isPassword
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  placeholder="Sua senha"
                />
              </div>
              <div className={styles.forgotWrapper}>
                <button type="button" onClick={handleForgotPassword} className={styles.forgotBtn}>
                  Esqueceu sua senha?
                </button>
              </div>
              <LoadingButton
                type="submit"
                loading={loading}
                className={styles.submitBtn}
              >
                Login
              </LoadingButton>
            </form>
            <LinkPrompt
              prompt="Não possui uma conta?"
              linkText="Cadastra-se"
              onClick={handleGoToSignup}
              className={styles.linkPrompt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
