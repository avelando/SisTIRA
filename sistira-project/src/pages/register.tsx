import React, { useState } from "react";
import { registerUser } from "@/services/authServices";
import FormField from "@/components/FormField";
import AuthButton from "@/components/AuthButton";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import BackButton from "@/components/BackButton";
import styles from "@/styles/AuthPages.module.css";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/types/nextPageWithLayout";

const Register: NextPageWithLayout = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleNextStep = () => {
    if (!firstName || !lastName || !username) {
      setError("Preencha todos os campos para continuar.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
    setError("");
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
  
    try {
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        username: username.trim(),
        password: password.trim(),
      };
  
      console.log("Dados a serem enviados:", userData);
  
      await registerUser(userData);
  
      alert("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido ao tentar cadastrar.");
      }
    }
  };  

  return (
    <div className={styles.content}>
      <BackButton text="Home" />
      <div className={styles.page}>
        <div className={styles.text}>
          <h1>Bem-vindo(a) ao SisTIRA</h1>
          <span>Preencha suas credenciais para criar uma conta</span>
        </div>

        <h2 className={styles.stepTitle}>{step === 1 ? "Identificação" : "Credenciais"}</h2>

        {step === 1 && (
          <>
            <FormField type="text" label="Nome" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <FormField type="text" label="Sobrenome" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <FormField type="text" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            {error && <p className={styles.error}>{error}</p>}
            <AuthButton text="Próximo" onClick={handleNextStep} />
          </>
        )}

        {step === 2 && (
          <>
            <FormField type="email" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormField type="password" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormField type="password" label="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {error && <p className={styles.error}>{error}</p>}
            
            <div className={styles.buttonContainer}>
              <AuthButton text="Voltar" onClick={handlePreviousStep} />
              <AuthButton text="Cadastrar" onClick={handleRegister} />
            </div>
          </>
        )}

        <div className={styles.separatorContainer}>
          <hr className={styles.separator} />
          <span className={styles.separatorText}>ou</span>
          <hr className={styles.separator} />
        </div>
        <GoogleAuthButton content="Crie uma conta com o Google" />

        <div className={styles.progressContainer}>
          <div className={`${styles.progressStep} ${step === 1 ? styles.active : ""}`} />
          <div className={`${styles.progressStep} ${step === 2 ? styles.active : ""}`} />
        </div>

        <div className={styles.footer}>
          Já possui uma conta? <a href="/login">Faça o Login</a>
        </div>
      </div>
    </div>
  );
}

Register.getLayout = (page) => page;

export default Register;
