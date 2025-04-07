"use client";
import { Message as MessageType } from "@/generated/prisma";
import { Examples } from "../Examples";
import { Message } from "../ui/Message";
import { useEffect, useRef } from "react";

type Props = {
  messages: MessageType[];
};

export const Messages = ({ messages }: Props) => {
  const bottom = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  if (messages.length === 0) return <Examples />;

  return (
    <div className="flex flex-col gap-2 mt-6 w-full overflow-y-auto mb-24">
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.text}
          isUser={message.userId ? true : false}
        />
      ))}
      <div ref={bottom} />
    </div>
  );
};
