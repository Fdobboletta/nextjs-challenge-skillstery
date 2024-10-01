"use client";
import { CreateMessageResponse } from "@/app/api/message/types";
import { apiFetch } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type NewMessageFormFields = {
  receiverEmail: string;
  title: string;
  content: string;
};

export const NewMessageForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewMessageFormFields>();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Check internet connection before sending a message
      if (!navigator.onLine) {
        toast.error(
          "You are not connected to the internet. Please check your network."
        );
        return;
      }

      const { data: newMessage, error } = await apiFetch<CreateMessageResponse>(
        {
          path: `${process.env.NEXT_PUBLIC_BASE_URL}/api/message/`,
          method: "POST",
          body: data,
        }
      );
      if (error) {
        toast.error(error);
        return;
      }
      if (newMessage) {
        toast.success("Your message has been sent!");
        router.push("/user/sent");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Receiver user not found") {
          toast.error("Receiver user does not exist");
        }
        toast.error("Failed to send your message. Please try again.");
      }
    }
  });

  return (
    <div className="w-full max-w-md p-8 mx-auto bg-white border rounded-lg shadow max-h-[600px] overflow-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">New Message</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="to"
            className="block text-sm font-medium text-gray-700"
          >
            To:
          </label>
          <input
            type="email"
            id="to"
            {...register("receiverEmail", {
              required: "Receiver email is required",
            })}
            className={`mt-1 p-2 border text-black ${
              errors.receiverEmail ? "border-red-500" : "border-gray-300"
            } rounded-md w-full`}
            placeholder="receiver@example.com"
          />
          {errors.receiverEmail && (
            <p className="text-red-500 text-sm">
              {errors.receiverEmail.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 30,
                message: "Title cannot exceed 30 characters",
              },
            })}
            className={`mt-1 p-2 border text-black ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md w-full`}
            placeholder="Enter title (max 30 chars)"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <textarea
            id="content"
            {...register("content", {
              required: "Message content is required",
            })}
            className={`mt-1 p-2 border text-black ${
              errors.content ? "border-red-500" : "border-gray-300"
            } rounded-md w-full`}
            rows={5}
            placeholder="Type your message here..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default NewMessageForm;
