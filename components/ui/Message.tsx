import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
type Props = {
  isUser: boolean;
  text: string;
  userImg: string | null;
};

export const Message = ({ isUser, text, userImg }: Props) => {
  return (
    <div className="p-4 bg-bgLight rounded-lg flex items-start gap-2.5 text-[11px] md:text-xs flex-col vsm:flex-row ">
      {isUser ? (
        <Image
          src={userImg ? userImg : "/icons/avatar.svg"}
          width={24}
          height={24}
          alt="Аватар пользователя"
          className="rounded-full"
        />
      ) : (
        <Image src={"/icons/logo.svg"} width={24} height={24} alt="Logo" />
      )}

      <div>
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
    </div>
  );
};
