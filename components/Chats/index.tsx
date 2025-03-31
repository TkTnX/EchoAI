import { ChatItem } from "../ChatItem";

export const Chats = () => {
  return (
    <div className="mt-5 ">
      <h6 className="uppercase opacity-40">Библиотека</h6>
      {/* CHATS */}
      <div className="flex flex-col mt-1 gap-1 max-h-full overflow-y-auto">
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />

      </div>
    </div>
  );
};
