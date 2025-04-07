import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
type Props = {
  isUser: boolean;
  text: string;
};

export const Message = ({ isUser, text }: Props) => {
  return (
    <div className="p-4 bg-bgLight rounded-lg flex items-start gap-2.5 text-[11px] md:text-xs flex-col vsm:flex-row ">
      {isUser ? (
        <Image src="/icons/avatar.svg" width={16} height={16} alt="USERNAME" />
      ) : (
        <Image src={"/icons/logo.svg"} width={24} height={24} alt="Logo" />
      )}

      <div>
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
    </div>
  );
};
