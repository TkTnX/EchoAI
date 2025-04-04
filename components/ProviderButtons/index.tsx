import { signIn } from "next-auth/react";
import Image from "next/image";
import { PROVIDERS } from "./config";

export const ProviderButtons = () => {
  return (
    <>
      {PROVIDERS.map((provider, index) => (
        <button
          key={index}
          className="border border-bgLight p-2 rounded-lg text-xs w-full transition hover:opacity-80 flex items-center justify-center gap-3"
          onClick={() =>
            signIn(provider.provider, { callbackUrl: "/", redirect: true })
          }
        >
          <Image
            src={provider.icon}
            alt={provider.name}
            width={25}
            height={25}
          />
          Продолжить с {provider.name}
        </button>
      ))}
    </>
  );
};
