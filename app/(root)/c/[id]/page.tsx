import { ChatHeader } from "@/components/ChatHeader";
import { Messages } from "@/components/Messages";
import { PromptForm } from "@/components/ui/PromptForm";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions);
  const id = (await params).id;

  const chat = await prisma.chat.findFirst({
    where: {
      id,
    },
    include: {
      messages: true,
      user: true,
    },
  });

  if (!chat || chat.user.email !== session?.user?.email) return redirect("/");

  return (
    <>
      <ChatHeader chat={chat} />
      {/* Messages */}
      <Messages userImg={chat.user.img} messages={chat.messages} />

      {/* FORM */}
      <div className="absolute bottom-10 mx-auto px-3 w-full flex justify-center">
        <PromptForm chatId={chat.id} />
      </div>
    </>
  );
};

export default ChatPage;
