import { MessageList } from "@/components/MessageList";

import { fetchInboxMessages } from "./actions";

export const InboxPage = async () => {
  const messagesForDisplay = await fetchInboxMessages();

  return (
    <MessageList
      title="Inbox"
      messages={messagesForDisplay}
      emptyListLabel="Your inbox is empty"
    />
  );
};

export default InboxPage;
