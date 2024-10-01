type FetchOptions = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown>;
  headers?: HeadersInit;
};

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export const apiFetch = async <T = unknown>({
  path,
  method,
  body,
  headers,
}: FetchOptions): Promise<ApiResponse<T>> => {
  try {
    const res = await fetch(path, {
      method,
      headers: headers ?? {
        "Content-Type": "application/json",
      },
      credentials: "include", // This value ensures cookies are sent from client components
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      return { error: `Error ${res.status}: ${errorMessage}` };
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    // Handle network or other unexpected errors
    return { error: (error as Error).message || "Something went wrong" };
  }
};
