import { MessageList } from "@/components/MessageList";
import { fetchSentMessages } from "./actions";

export default async function SentPage() {
  const messagesForDisplay = await fetchSentMessages();

  return (
    <MessageList
      title={"Sent"}
      prefix="TO"
      messages={messagesForDisplay}
      emptyListLabel="You do not have sent messages yet."
      canDelete={false}
    />
  );
}
