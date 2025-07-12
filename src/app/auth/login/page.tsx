'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/api/auth';
import FormField from '@/components/ui/FormField';
import AuthButton from '@/components/ui/AuthButton';
import GoogleAuthButton from '@/components/ui/GoogleAuthButton';
import BackButton from '@/components/ui/BackButton';
import styles from '@/styles/AuthPage.module.css';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <BackButton text="Home" />

        <div className={styles.header}>
          <h1 className={styles.title}>Bem-vindo(a) de volta</h1>
          <span className={styles.description}>
            Preencha suas credenciais para acessar sua conta
          </span>
        </div>

        <FormField
          type="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          type="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <AuthButton
          text="Entrar"
          onClick={handleLogin}
          className={styles.authButton}
        />

        <div className={styles.divider}>
          <hr className={styles.dividerHr} />
          <span className={styles.dividerText}>ou</span>
          <hr className={styles.dividerHr} />
        </div>

        <GoogleAuthButton
          content="Acesse sua conta com o Google"
          redirectUrl="http://127.0.0.1:3001/auth/google"
        />

        <div className={styles.footerText}>
          Não possui uma conta?{' '}
          <a href="/auth/register" className={styles.footerLink}>
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}
