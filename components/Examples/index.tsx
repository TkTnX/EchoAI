import { Button } from "../ui/Button";
import { EXAMPLES } from "./config";

export const Examples = () => {
  return (
    <div className="text-center mt-6 w-full vsm:w-auto">
      <h4 className="text-sm">Примеры</h4>
      <div className="grid w-full  vsm:grid-cols-2 gap-3 mt-6">
        {EXAMPLES.map((example, index) => (
          <Button
            className="opacity-50 p-4 vsm:max-w-[260px] w-full hover:opacity-80 justify-center"
            blurPosition="-bottom-4 left-1/2 -translate-x-1/2"
            key={index}
          >
            {example.text}
          </Button>
        ))}
      </div>
    </div>
  );
};
