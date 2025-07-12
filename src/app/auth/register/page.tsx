'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/api/auth';
import FormField from '@/components/ui/FormField';
import AuthButton from '@/components/ui/AuthButton';
import GoogleAuthButton from '@/components/ui/GoogleAuthButton';
import BackButton from '@/components/ui/BackButton';
import styles from '@/styles/AuthPage.module.css';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleNextStep = () => {
    if (!firstName || !lastName || !username) {
      setError('Preencha todos os campos para continuar.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
    setError('');
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    try {
      await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      alert('Cadastro realizado com sucesso!');
      router.push('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao tentar cadastrar.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <BackButton text="Home" />
        <div className={styles.header}>
          <h1 className={styles.title}>Bem-vindo(a) ao SisTIRA</h1>
          <span className={styles.description}>
            Preencha suas credenciais para criar uma conta
          </span>
        </div>
        <h2 className={styles.subTitle}>{step === 1 ? 'Identificação' : 'Credenciais'}</h2>

        {step === 1 ? (
          <>
            <FormField
              type="text"
              label="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormField
              type="text"
              label="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormField
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {error && <p className={styles.error}>{error}</p>}
            <AuthButton
              text="Próximo"
              onClick={handleNextStep}
              className={styles.authButton}
            />
          </>
        ) : (
          <>
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
            <FormField
              type="password"
              label="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.buttonGroup}>
              <AuthButton
                text="Voltar"
                onClick={handlePreviousStep}
                className={styles.secondaryButton}
              />
              <AuthButton
                text="Cadastrar"
                onClick={handleRegister}
                className={styles.authButton}
              />
            </div>
          </>
        )}

        <div className={styles.divider}>
          <hr className={styles.dividerHr} />
          <span className={styles.dividerText}>ou</span>
          <hr className={styles.dividerHr} />
        </div>

        <GoogleAuthButton
          content="Crie uma conta com o Google"
          redirectUrl="http://127.0.0.1:3001/auth/google"
        />

        <div className={styles.steps}>
          <div className={`${styles.step} ${step === 1 ? styles.stepActive : ''}`} />
          <div className={`${styles.step} ${step === 2 ? styles.stepActive : ''}`} />
        </div>

        <div className={styles.footerText}>
          Já possui uma conta?{' '}
          <a href="/auth/login" className={styles.footerLink}>
            Faça o Login
          </a>
        </div>
      </div>
    </div>
  );
}
