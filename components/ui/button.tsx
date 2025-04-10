import { cn } from "@/lib/utils";
import { Blur } from "./Blur";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  blurPosition?: string;
  type?: "submit" | "button" | "reset";
  children: React.ReactNode;
}

const Button = ({
  blurPosition,
  className,
  children,
  type,
  ...props
}: Props) => {
  return (
    <button
      type={type || "button"}
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

export default Button