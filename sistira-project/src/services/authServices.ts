const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/accounts";

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ocorreu um erro desconhecido.");
    }
  }
};

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-auth/`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Usuário não autenticado");

    return await response.json();
  } catch {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await fetch(`${API_BASE_URL}/logout/`, {
      method: "POST",
      credentials: "include",
    });

    return true;
  } catch {
    return false;
  }
};

export const registerUser = async (data: { first_name: string; last_name: string; email: string; username: string; password: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/`, {
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
