import { GetMessageResponse } from "@/app/api/message/[id]/types";
import { apiFetch } from "@/app/utils/api";
import { headers } from "next/headers";
import { toast } from "react-hot-toast";

export const fetchMessageById = async (messageId: number) => {
  try {
    const { data: messageFromApi, error } = await apiFetch<GetMessageResponse>({
      path: `${process.env.NEXT_PUBLIC_BASE_URL}/api/message/${messageId}`,
      method: "GET",
      headers: headers(),
    });
    if (error) {
      toast.error(error);
    }

    return messageFromApi;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      return undefined;
    }
  }
};
