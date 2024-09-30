import { GetInboxMessagesResponse } from "@/app/api/inbox/types";
import { apiFetch } from "@/app/utils/api";
import { headers } from "next/headers";

export const fetchInboxMessages = async () => {
  try {
    const messagesFromApi =
      (await apiFetch<GetInboxMessagesResponse>({
        path: `${process.env.NEXT_PUBLIC_BASE_URL}/api/inbox/`,
        method: "GET",
        headers: headers(),
      })) || [];

    return messagesFromApi.map((message) => ({
      id: message.id,
      title: message.title,
      userName: `${message.sender.firstName} ${message.sender.lastName}`,
      userEmail: message.sender.email,
    }));
  } catch (error) {
    console.error("Error fetching inbox messages:", error);
    return [];
  }
};
