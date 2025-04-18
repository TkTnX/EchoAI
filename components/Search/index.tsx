import { useChatStore } from "@/stores/ChatStore";
import { SearchIcon } from "lucide-react";

export const Search = () => {
  const { setSearch } = useChatStore();
  return (
    <div className="flex items-center  bg-bgLight pl-3 rounded-lg">
      <SearchIcon
        color="#777779"
        size={16}
        className="min-w-4 min-h-4 w-4 h-4"
      />
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Поиск..."
        className="text-xs outline-none p-3"
      />
    </div>
  );
};
