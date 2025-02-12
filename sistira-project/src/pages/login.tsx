import React, { useState } from 'react';
import FormField from '@/components/FormField';
import AuthButton from '@/components/AuthButton';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import styles from '@/styles/AuthPages.module.css';
import BackButton from '@/components/BackButton';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    console.log('Register:', { email, username, password, confirmPassword });
  };

  return (
    <div className={styles.content}>
      <BackButton text='Home' />
      <div className={styles.page}>
        <div className={styles.text}>
          <h1>Bem vindo(a) de volta</h1>
          <span>Preencha suas credenciais para criar uma conta</span>
        </div>

        <FormField type="email" label="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <FormField type="password" label="Senha" value={password} onChange={e => setPassword(e.target.value)} />

        <div className={styles.separatorContainer}>
          <hr className={styles.separator} />
          <span className={styles.separatorText}>OU</span>
          <hr className={styles.separator} />
        </div>

        <GoogleAuthButton content="Acesse sua conta com o Google" />

        <AuthButton text="Entrar" onClick={handleLogin} />        

        <div className={styles.footer}>
          Não possui uma conta? <a href="/register">Cadastra-se</a>
        </div>
      </div>
    </div>
  );
}
