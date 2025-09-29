'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, BookOpen, CheckCircle, Users, Award } from 'lucide-react';
import styles from '@/styles/AuthPages.module.css';
import GoogleAuthButton from '@/components/ui/GoogleAuthButton';
import FormField from '@/components/ui/FormField';
import LinkPrompt from '@/components/ui/LinkPrompt';
import LoadingButton from '@/components/ui/LoadingButton';
import FeatureList from '@/components/ui/FeatureList';
import BackButton from '@/components/ui/BackButton';
import { loginUser } from '@/api/auth';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string>('');

  const features = [
    { icon: <CheckCircle size={24} />, title: 'Correção Automática', text: 'IA avançada para correção de questões' },
    { icon: <Users size={24} />, title: 'Gestão Completa', text: 'Organize provas e questões facilmente' },
    { icon: <Award size={24} />, title: 'Relatórios Detalhados', text: 'Análises completas de desempenho' },
  ];

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setGlobalError('');
    setErrors((e) => ({ ...e, [field]: '' }));
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    setGlobalError('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      await loginUser({ email: formData.email, password: formData.password });
      router.replace('/dashboard');
    } catch (err: any) {
      const msg = err?.message || 'Não foi possível fazer login.';
      setGlobalError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => router.push('/');
  const handleGoToSignup = () => router.push('/auth/register');
  const handleForgotPassword = () => console.log('navigate to forgot password');

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <div className={styles.pattern} />
        <div className={styles.contentOverlay}>
          <div className={styles.logoBar}>
            <div className={styles.logoBox}><BookOpen size={24} className={styles.logoIcon} /></div>
            <span className={styles.logoText}>SisTIRA</span>
          </div>

          <div className={styles.welcome}>
            <h1 className={styles.welcomeTitle}>
              Bem-vindo de volta ao <span className={styles.welcomeHighlight}>SisTIRA</span>
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
            <GoogleAuthButton content="Entrar com o Google" />
            <div className={styles.divider}><div className={styles.line} />ou<div className={styles.line} /></div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <FormField
                  label="Email"
                  icon={<Mail size={20} />}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Sua senha"
                />
                {errors.password && <p className={styles.errorText}>{errors.password}</p>}
              </div>

              {globalError && <p className={styles.errorText}>{globalError}</p>}

              <div className={styles.forgotWrapper}>
                <button type="button" onClick={handleForgotPassword} className={styles.forgotBtn}>
                  Esqueceu sua senha?
                </button>
              </div>

              <LoadingButton type="submit" loading={loading} className={styles.submitBtn}>
                Login
              </LoadingButton>
            </form>

            <LinkPrompt
              prompt="Não possui uma conta?"
              linkText="Cadastrar-se"
              onClick={handleGoToSignup}
              className={styles.linkPrompt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
