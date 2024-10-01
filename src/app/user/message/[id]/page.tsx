import { NextPage } from "next";
import { fetchMessageById } from "./actions";

const ReadMessagePage: NextPage<{ params: { id: string } }> = async ({
  params,
}) => {
  const messageId = Number(params.id);
  const message = await fetchMessageById(messageId);

  if (!message) {
    return <div className="text-center text-red-500">Message not found</div>;
  }

  console.log("message", message);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md max-h-[600px] overflow-auto">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{message.title}</h1>
      </div>
      <div className="border-b pb-4 mb-6">
        <p className="font-semibold text-gray-700">
          From: {`${message.sender.firstName} ${message.sender.lastName}`}
          <span className="ml-2 text-gray-500">({message.sender.email})</span>
        </p>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
        <p className="text-gray-600">{message.content}</p>
      </div>
    </div>
  );
};

export default ReadMessagePage;
