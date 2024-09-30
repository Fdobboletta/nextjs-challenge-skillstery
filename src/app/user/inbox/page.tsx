import { GetInboxMessagesResponse } from "@/app/api/inbox/types";
import { routePaths } from "@/app/routePaths";
import { apiFetch } from "@/app/utils/api";
import Link from "next/link";

export const InboxPage = async () => {
  const messages: GetInboxMessagesResponse =
    (await apiFetch<GetInboxMessagesResponse>({
      path: `${process.env.NEXTAUTH_URL}/api/inbox/`,
      method: "GET",
    })) || [];

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id}>
            <Link href={`${routePaths.inbox}/${message.id}`}>
              <div className="p-4 border border-gray-300 rounded-md hover:bg-gray-100">
                <p className="font-semibold">{message.senderId}</p>
                <p>{message.title}</p>
              </div>
            </Link>
          </li>
        ))}
        {messages.length === 0 && (
          <div className="flex justify-center p-4 border border-gray-300 rounded-md">
            Your inbox is empty
          </div>
        )}
      </ul>
    </div>
  );
};

export default InboxPage;
