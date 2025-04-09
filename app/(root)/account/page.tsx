import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "@/components/LogoutButton";
import { EditProfile } from "@/components/ui/Modals";
import prisma from "@/prisma/prisma";
import { Edit } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const AcctounPage = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email as string },
  });

  if (!user) return redirect("/");
  return (
    <div>
      <h2 className="text-center">Ваш профиль</h2>
      <div className="flex items-start gap-3 mt-10">
        <Image
          alt={user.username}
          src={user.img || "/icons/avatar.svg"}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <p>{user.username}</p>
          <p className="text-sm opacity-60">{user.email}</p>
          <span className="text-xs font-light opacity-60">
            Зарегистрирован:{"  "}
            {new Date(user.createdAt).toLocaleString("ru-RU", {
              dateStyle: "medium",
            })}
          </span>
        </div>
        <EditProfile user={user}>
          <button className="absolute top-3 right-3 ">
            <Edit color="#777779" className="hover:stroke-white transition" />
          </button>
        </EditProfile>
      </div>
      <LogoutButton />
    </div>
  );
};

export default AcctounPage;
