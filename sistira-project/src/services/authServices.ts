// authService.ts

// Se estiver usando variáveis de ambiente, garanta que NEXT_PUBLIC_API_URL aponte para
// o mesmo domínio/host do seu backend (ex.: http://localhost:8000).
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Faz login enviando email/senha para o backend.
 * O backend retornará (set-cookie) o 'authToken' que será armazenado no navegador.
 */
export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // importante para receber e enviar cookies
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao realizar login.");
  }

  // Não precisamos salvar token localmente; o cookie já foi setado automaticamente.
  return await response.json();
};

/**
 * Verifica se o usuário está autenticado.
 * Se o cookie 'authToken' for válido, retorna os dados do usuário; caso contrário, retorna null.
 */
export async function checkAuth() {
  const response = await fetch(`${API_BASE_URL}/api/accounts/check-auth/`, {
    method: "GET",
    credentials: "include", // envia o cookie 'authToken' automaticamente
  });

  if (!response.ok) {
    // Em caso de 401, retornamos null para indicar que não há sessão válida.
    return null;
  }

  return await response.json();
}

/**
 * Registra um novo usuário no sistema.
 * O cookie de sessão (caso seja configurado) também será retornado se o backend assim definir.
 */
export const registerUser = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/accounts/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao registrar usuário.");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ocorreu um erro desconhecido.");
    }
  }
};
