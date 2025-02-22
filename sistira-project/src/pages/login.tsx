import React, { useState } from "react";
import { loginUser } from "@/services/authServices";
import FormField from "@/components/FormField";
import AuthButton from "@/components/AuthButton";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import BackButton from "@/components/BackButton";
import styles from "@/styles/AuthPages.module.css";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      alert("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao tentar fazer login.");
      }
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

        <GoogleAuthButton content="Acesse sua conta com o Google" />
        <AuthButton text="Entrar" onClick={handleLogin} />

        <div className={styles.footer}>
          Não possui uma conta? <a href="/register">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}
