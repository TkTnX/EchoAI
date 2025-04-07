import GigaChat from "gigachat";
export const connectGiga = async () => {
  const giga = new GigaChat({
      credentials: process.env.GIGA_AUTH_KEY,
  });

  return giga;
};
