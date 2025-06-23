'use client';

import React, { useState } from "react";
import { loginUser } from "@/api/auth";
import FormField from "@/components/ui/FormField";
import AuthButton from "@/components/ui/AuthButton";
import GoogleAuthButton from "@/components/ui/GoogleAuthButton";
import BackButton from "@/components/ui/BackButton";
import { useRouter } from "next/navigation";

export default function Login() {
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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <BackButton text="Home" />

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-[#133856]">Bem-vindo(a) de volta</h1>
          <span className="block text-sm text-gray-600">
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

        {error && (
          <p className="text-red-600 text-sm text-center mt-2">{error}</p>
        )}

        <AuthButton
          text="Entrar"
          onClick={handleLogin}
          className="mt-4 w-full"
        />

        <div className="flex items-center gap-2 my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-sm font-bold text-gray-600">ou</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <GoogleAuthButton
          content="Acesse sua conta com o Google"
          redirectUrl="http://127.0.0.1:3001/auth/google"
        />

        <div className="mt-6 text-center text-sm text-gray-600">
          Não possui uma conta?{" "}
          <a
            href="/auth/register"
            className="text-[#133856] font-medium hover:underline"
          >
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}
