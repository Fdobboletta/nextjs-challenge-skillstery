import { headers } from "next/headers";

type FetchOptions = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown>;
};

export const apiFetch = async <T>({
  path,
  method,
  body,
}: FetchOptions): Promise<T> => {
  const res = await fetch(path, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });

  return await res.json();
};
