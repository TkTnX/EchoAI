import { PromptForm } from "@/components/ui/PromptForm";

const ChatPage = () => {
  return (
    <>
      <h1 className="mt-3 text-4xl xl:text-7xl tracking-wider font-bold text-center  textGradient bg-gradient-to-r from-[#4bece2] via-[#bddcda] to-[#d2d9d9] bg-[200%_auto] bg-clip-text text-transparent">
        Чем я могу помочь?
      </h1>
      <div className="absolute bottom-10 mx-auto px-3 w-full flex justify-center">
        <PromptForm />
      </div>
    </>
  );
};

export default ChatPage;
