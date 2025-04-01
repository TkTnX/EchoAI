import { Examples } from "../Examples";
import { Message } from "../ui/Message";

export const Messages = () => {
  const messages = [];

  if (messages.length === 0) return <Examples />;

  return (
    <div className="flex flex-col gap-2 mt-6 w-full overflow-y-auto mb-24">
      <Message isUser={true} text="Привет, EchoAI" />
      <Message
        isUser={false}
        text="Добрый день, пользователь! Чем я могу вам помочь? "
      />
    </div>
  );
};
