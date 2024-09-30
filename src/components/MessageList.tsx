"use client";
import { routePaths } from "@/app/routePaths";
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
};

export const MessageList = (props: MessageListProps) => {
  const router = useRouter();
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
              <Link href={`${routePaths.inbox}/${message.id}`}>
                <div className="p-4 border border-gray-300 rounded-md hover:bg-gray-100">
                  <div>
                    <span className="font-semibold">{message.userName}</span>
                    <span className="ml-4">({message.userEmail})</span>
                  </div>
                  <p>{message.title}</p>
                </div>
              </Link>
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
