'use client';

import React, { useState } from "react";
import { registerUser } from "@/api/auth";
import FormField from "@/components/ui/FormField";
import AuthButton from "@/components/ui/AuthButton";
import GoogleAuthButton from "@/components/ui/GoogleAuthButton";
import BackButton from "@/components/ui/BackButton";
import { useRouter } from "next/navigation";

export default function Register() {
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
      await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      alert("Cadastro realizado com sucesso!");
      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao tentar cadastrar.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <BackButton text="Home" />

        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-[#133856]">
            Bem-vindo(a) ao SisTIRA
          </h1>
          <span className="block text-sm text-gray-600">
            Preencha suas credenciais para criar uma conta
          </span>
        </div>

        <h2 className="text-center text-xl font-medium text-[#133856] mb-4">
          {step === 1 ? "Identificação" : "Credenciais"}
        </h2>

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
            {error && (
              <p className="text-red-600 text-sm text-center mb-2">{error}</p>
            )}
            <AuthButton text="Próximo" onClick={handleNextStep} className="w-full" />
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
            {error && (
              <p className="text-red-600 text-sm text-center mb-2">{error}</p>
            )}

            <div className="flex justify-between mb-4">
              <AuthButton text="Voltar" onClick={handlePreviousStep} className="bg-gray-300 text-gray-700 hover:bg-gray-400" />
              <AuthButton text="Cadastrar" onClick={handleRegister} className="ml-2 w-full" />
            </div>
          </>
        )}

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-sm font-bold text-gray-600">ou</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <GoogleAuthButton
          content="Crie uma conta com o Google"
          redirectUrl="http://127.0.0.1:3001/auth/google"
        />

        <div className="flex justify-center gap-2 mt-6">
          <div
            className={`w-5 h-1 rounded-full transition-colors ${
              step === 1 ? "bg-[#133856]" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-5 h-1 rounded-full transition-colors ${
              step === 2 ? "bg-[#133856]" : "bg-gray-300"
            }`}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Já possui uma conta?{" "}
          <a
            href="/auth/login"
            className="text-[#133856] font-medium hover:underline"
          >
            Faça o Login
          </a>
        </div>
      </div>
    </div>
  );
}
