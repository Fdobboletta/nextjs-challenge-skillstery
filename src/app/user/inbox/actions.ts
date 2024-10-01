import { GetInboxMessagesResponse } from "@/app/api/inbox/types";
import { apiFetch } from "@/app/utils/api";
import { headers } from "next/headers";

export const fetchInboxMessages = async () => {
  try {
    const { data: messagesFromApi, error } =
      (await apiFetch<GetInboxMessagesResponse>({
        path: `${process.env.NEXT_PUBLIC_BASE_URL}/api/inbox/`,
        method: "GET",
        headers: headers(),
      })) || [];

    if (error) {
      console.error(error);
    }
    if (messagesFromApi === undefined) return [];

    return messagesFromApi.map((message) => ({
      id: message.id,
      title: message.title,
      userName: `${message.sender.firstName} ${message.sender.lastName}`,
      userEmail: message.sender.email,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return [];
  }
};
