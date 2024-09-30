import { GetMessageResponse } from "@/app/api/message/[id]/types";
import { apiFetch } from "@/app/utils/api";
import { headers } from "next/headers";

export const fetchMessageById = async (messageId: number) => {
  try {
    const messageFromApi = await apiFetch<GetMessageResponse>({
      path: `${process.env.NEXT_PUBLIC_BASE_URL}/api/message/${messageId}`,
      method: "GET",
      headers: headers(),
    });
    return messageFromApi;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return undefined;
    }
  }
};
