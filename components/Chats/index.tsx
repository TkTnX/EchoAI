import { Chat } from "@/generated/prisma";
import { ChatItem } from "../ChatItem";
import { Skeleton } from "../ui/skeleton";

type Props = {
  loading: boolean;
  chats: Chat[];
};

export const Chats = ({ loading, chats }: Props) => {
  return (
    <div className="mt-5 ">
      <h6 className="uppercase opacity-40">Библиотека</h6>
      {/* CHATS */}
      <div className="flex flex-col mt-1 gap-1 max-h-full overflow-y-auto h-full">
        {loading ? (
          [...new Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-12 w-full bg-bgLight" />
          ))
        ) : chats.length > 0 ? (
          chats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
        ) : (
          <p className="text-xs text-center opacity-50 w-full h-full mt-[100%]">
            Чатов ещё нет!
          </p>
        )}
      </div>
    </div>
  );
};
