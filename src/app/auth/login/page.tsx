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
import styles from '@/styles/LoginPage.module.css';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
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
          <div className={styles.features}>
            {[
              { icon: <CheckCircle size={24} />, title: 'Correção Automática', text: 'IA avançada para correção de questões' },
              { icon: <Users size={24} />, title: 'Gestão Completa', text: 'Organize provas e questões facilmente' },
              { icon: <Award size={24} />, title: 'Relatórios Detalhados', text: 'Análises completas de desempenho' },
            ].map((f, i) => (
              <div key={i} className={styles.featureItem}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureText}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.statsGrid}>
            {[{ v: '1000+', l: 'Questões' }, { v: '500+', l: 'Provas' }, { v: '98%', l: 'Satisfação' }].map((s, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statValue}>{s.v}</div>
                <div className={styles.statLabel}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.backBtnWrapper}>
          <button onClick={handleBackToHome} className={styles.backBtn}>
            <ArrowLeft size={20} /> Voltar ao início
          </button>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Entrar na conta</h2>
            <p className={styles.formSubtitle}>Acesse sua conta para continuar</p>
          </div>
          <button onClick={handleGoogleLogin} disabled={loading} className={styles.googleBtn}>
            <Chrome size={20} className={styles.googleIcon} /> Continuar com Google
          </button>
          <div className={styles.divider}>
            <div className={styles.line} /><span>ou</span><div className={styles.line} />
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <Mail size={20} className={styles.inputIcon} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>
            <div>
              <label className={styles.label}>Senha</label>
              <div className={styles.inputWrapper}>
                <Lock size={20} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  className={`${styles.input} ${errors.password ? styles.error : ''}`}
                  placeholder="Sua senha"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.toggleBtn}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className={styles.errorText}>{errors.password}</p>}
            </div>
            <div className={styles.forgotWrapper}>
              <button type="button" onClick={handleForgotPassword} className={styles.forgotBtn}>
                Esqueceu sua senha?
              </button>
            </div>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <div className={styles.signupPrompt}>
            Não tem uma conta? <button onClick={handleGoToSignup} className={styles.signupLink}>Cadastre-se</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
