"use client";
import { PatchMessageResponse } from "@/app/api/message/[id]/types";
import { routePaths } from "@/app/routePaths";
import { apiFetch } from "@/app/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Messages = {
  id: number;
  title: string;
  userEmail: string;
  userName: string;
};

type MessageListProps = {
  title: string;
  messages: Messages[];
  emptyListLabel: string;
  prefix: "FROM" | "TO";
  canDelete: boolean;
};

export const MessageList = (props: MessageListProps) => {
  const router = useRouter();

  const displayPrefix = `${props.prefix}: `;

  // TODO: Add confirmation modal
  const handleDeleteMessage = async (messageId: number) => {
    try {
      const updatedMessage = await apiFetch<PatchMessageResponse>({
        path: `${process.env.NEXT_PUBLIC_BASE_URL}/api/message/${messageId}`,
        method: "PATCH",
      });
      if (updatedMessage.isDeleted) {
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <button
          onClick={() => router.refresh()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
      <ul className="space-y-4 max-h-[600px] overflow-auto">
        {props.messages.length > 0 ? (
          props.messages.map((message) => (
            <li key={message.id}>
              <div className="p-4 border border-gray-300 rounded-md hover:bg-gray-500 flex justify-between items-center">
                <Link href={`/user/message/${message.id}`} className="flex-1">
                  <div>
                    <span className="font-semibold">{displayPrefix}</span>
                    <span>{message.userName}</span>
                    <span className="ml-4">({message.userEmail})</span>
                  </div>
                  <p>{message.title}</p>
                </Link>
                {props.canDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMessage(message.id);
                    }}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <div className="flex justify-center p-4 border border-gray-300 rounded-md">
            {props.emptyListLabel}
          </div>
        )}
      </ul>
    </div>
  );
};
