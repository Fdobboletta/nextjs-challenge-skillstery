type FetchOptions = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown>;
  headers?: HeadersInit;
};

export const apiFetch = async <T>({
  path,
  method,
  body,
  headers,
}: FetchOptions): Promise<T> => {
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
    throw new Error(`Error ${res.status}: ${errorMessage}`);
  }

  return await res.json();
};
