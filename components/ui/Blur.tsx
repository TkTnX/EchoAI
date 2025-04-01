import { cn } from "@/lib/utils";

type Props = {
  className: string;
};

export const Blur = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "blur-2xl bg-[#575782]  w-[94px] h-[74px] absolute opacity-0 group-hover:opacity-100 transition",
        className
      )}
    />
  );
};
