import { GetSentMessagesResponse } from "@/app/api/sent/types";
import { apiFetch } from "@/app/utils/api";
import { headers } from "next/headers";

export const fetchSentMessages = async () => {
  try {
    const { data: messagesFromApi, error } =
      await apiFetch<GetSentMessagesResponse>({
        path: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sent/`,
        method: "GET",
        headers: headers(),
      });

    if (error) {
      console.error(error);
    }

    if (messagesFromApi === undefined) return [];

    return messagesFromApi.map((message) => ({
      id: message.id,
      title: message.title,
      userName: `${message.receiver.firstName} ${message.receiver.lastName}`,
      userEmail: message.receiver.email,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return [];
  }
};
