import { GetSentMessagesResponse } from "@/app/api/sent/types";
import { apiFetch } from "@/app/utils/api";
import { headers } from "next/headers";

export const fetchSentMessages = async () => {
  try {
    const messagesFromApi =
      (await apiFetch<GetSentMessagesResponse>({
        path: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sent/`,
        method: "GET",
        headers: headers(),
      })) || [];

    return messagesFromApi.map((message) => ({
      id: message.id,
      title: message.title,
      userName: `${message.receiver.firstName} ${message.receiver.lastName}`,
      userEmail: message.receiver.email,
    }));
  } catch (error) {
    console.error("Error fetching sent messages:", error);
    return [];
  }
};
