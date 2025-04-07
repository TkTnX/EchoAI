import { Ban } from "lucide-react";

export const StopGeneratingButton = () => {
  return (
    <button
      type="button"
      className="group transition flex items-center gap-1 p-2 rounded-lg bg-bgLight text-[10px] absolute -top-10 z-20 left-1/2 -translate-x-1/2"
    >
      <Ban
        color="#777779"
        size={16}
        className="group-hover:stroke-white transition"
      />
      <p className="opacity-60 group-hover:opacity-100 transition">
        Остановить генерацию
      </p>
    </button>
  );
};
