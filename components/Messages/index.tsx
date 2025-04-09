"use client";
import { Message as MessageType } from "@/generated/prisma";
import { Examples } from "../Examples";
import { Message } from "../ui/Message";
import { useEffect, useOptimistic, useRef } from "react";
import { OptimisticMessageProps, useChatStore } from "@/stores/ChatStore";

type Props = {
  messages: MessageType[];
  userImg: string | null;
};

export const Messages = ({ messages, userImg }: Props) => {
  const setAddOptimisticMessage = useChatStore(
    (state) => state.setAddOptimisticMessage
  );
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: OptimisticMessageProps) => [
      ...state,
      {
        text: newMessage.text as string,
        userId: newMessage.userId || null,
        id: Math.random().toString(),
        chatId: "0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
  );

  useEffect(() => {
    setAddOptimisticMessage(addOptimisticMessage);
  }, []);

  const bottom = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  if (messages.length === 0) return <Examples />;

  return (
    <div className="flex flex-col gap-2 mt-6 w-full overflow-y-auto mb-24">
      {optimisticMessages.map((message) => (
        <Message
          userImg={userImg}
          key={message.id}
          text={message.text}
          isUser={message.userId ? true : false}
        />
      ))}
      <div ref={bottom} />
    </div>
  );
};
