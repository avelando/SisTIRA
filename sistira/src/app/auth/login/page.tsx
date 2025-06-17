'use client';

import React, { useState } from "react";
import { loginUser } from "@/api/auth";
import FormField from "@/components/ui/FormField";
import AuthButton from "@/components/ui/AuthButton";
import GoogleAuthButton from "@/components/ui/GoogleAuthButton";
import BackButton from "@/components/ui/BackButton";
import styles from "@/styles/AuthPages.module.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    }
  };

  return (
    <div className={styles.content}>
      <BackButton text="Home" />
      <div className={styles.page}>
        <div className={styles.text}>
          <h1>Bem-vindo(a) de volta</h1>
          <span>Preencha suas credenciais para acessar sua conta</span>
        </div>

        <FormField type="email" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormField type="password" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <GoogleAuthButton
          content="Acesse sua conta com o Google"
          redirectUrl="http://127.0.0.1:3001/auth/google"
        />
        <AuthButton text="Entrar" onClick={handleLogin} />

        <div className={styles.footer}>
          Não possui uma conta? <a href="/auth/register">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}

export default Login;