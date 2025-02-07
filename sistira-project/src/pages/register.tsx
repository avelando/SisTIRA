import React, { useState } from 'react';
import FormField from '@/components/FormField';
import AuthButton from '@/components/AuthButton';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import styles from '@/styles/RegisterPage.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    console.log('Register:', { email, username, password, confirmPassword });
  };

  return (
    <div className={styles.content}>
      <div className={styles.page}>
        <div className={styles.text}>
          <h1>Bem vindo(a) ao SisTIRA</h1>
          <span>Preencha suas credenciais para criar uma conta</span>
        </div>

        <FormField type="email" label="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <FormField type="text" label="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <FormField type="password" label="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <FormField type="password" label="Confirme a senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

        <div className={styles.separatorContainer}>
          <hr className={styles.separator} />
          <span className={styles.separatorText}>OU</span>
          <hr className={styles.separator} />
        </div>

        <GoogleAuthButton text="Crie uma conta com o Google" />

        <AuthButton text="Cadastrar" onClick={handleRegister} />        

        <div className={styles.footer}>
          Já possui uma conta? <a href="/login">Faça o Login</a>
        </div>
      </div>
    </div>
  );
}
