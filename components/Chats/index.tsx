import { Chat } from "@/generated/prisma";
import { ChatItem } from "../ChatItem";
import { Skeleton } from "../ui/skeleton";
import { useChatStore } from "@/stores/ChatStore";

type Props = {
  loading: boolean;
  chats: Chat[];
  setOpen: (open: boolean) => void;
};

export const Chats = ({ loading, chats, setOpen }: Props) => {
  const { search } = useChatStore();
  const filters = chats?.filter((chat) => chat.name.includes(search)) || [];
  return (
    <div className="mt-5 ">
      <h6 className="uppercase opacity-40">Библиотека</h6>
      {/* CHATS */}
      <div className="flex flex-col mt-1 gap-1  overflow-y-auto h-[calc(100vh-300px)] ">
        {loading ? (
          [...new Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-12 w-full bg-bgLight" />
          ))
        ) : filters?.length > 0 ? (
          filters.map((chat) => (
            <ChatItem setOpen={setOpen} key={chat.id} chat={chat} />
          ))
        ) : (
          <p className="text-xs text-center opacity-50 w-full h-full mt-[100%]">
            Чатов ещё нет!
          </p>
        )}
      </div>
    </div>
  );
};
