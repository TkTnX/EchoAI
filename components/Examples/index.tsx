import { Blur } from "../ui/Blur";
import { EXAMPLES } from "./config";

export const Examples = () => {
  return (
    <div className="text-center mt-6 w-full vsm:w-auto">
      <h4 className="text-sm">Примеры</h4>
      <div className="grid w-full  vsm:grid-cols-2 gap-3 mt-6">
        {EXAMPLES.map((example, index) => (
          <button
            className="bg-bgLight opacity-50 p-4 rounded-lg vsm:max-w-[260px] w-full text-xs flex items-center justify-center transition hover:opacity-80 overflow-hidden relative group"
            key={index}
          >
            {example.text}
            {/* TODO: Сделать такие блюры в других местах */}
            {/* TODO: Сделать компонент кнопки, с такими блюрами */}
            <Blur className="w-[94px] h-[74px] -bottom-4" />
          </button>
        ))}
      </div>
    </div>
  );
};
