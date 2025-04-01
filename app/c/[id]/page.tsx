import { ChatHeader } from "@/components/ChatHeader";
import { Messages } from "@/components/Messages";
import { PromptForm } from "@/components/ui/PromptForm";

const ChatPage = () => {
  return (
    <>
      <ChatHeader />
      {/* Messages */}
      <Messages />

      {/* FORM */}
      <div className="absolute bottom-10 mx-auto px-3 w-full flex justify-center">
        <PromptForm />
      </div>
    </>
  );
};

export default ChatPage;
