const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://liara.picos.ifpi.edu.br";

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erro ao realizar login.");
  }

  return await response.json();
};

export async function checkAuth() {
  const response = await fetch(`${API_BASE_URL}/api/accounts/check-auth/`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

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
