import { cn } from "@/lib/utils";
import { Blur } from "./Blur";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    className?: string;
    blurPosition?: string;
    
  children: React.ReactNode;
  
}

export const Button = ({ blurPosition,className, children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center gap-3 bg-bgLight p-3 rounded-lg text-xs w-full transition hover:opacity-80 relative group overflow-hidden",
        className
      )}
    >
      <Blur className={`w-[94px] h-[74px]  z-30 ${blurPosition}`} />
      {children}
    </button>
  );
};
