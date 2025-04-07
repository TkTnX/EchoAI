import { OpenSidebarButton } from "@/components/OpenSidebarButton";
import { Sidebar } from "@/components/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex mx-1 sm:mx-5 gap-5 py-5 h-screen relative ">
      <Sidebar />

      <div className="flex-1 bg-foreground h-full rounded-[10px] py-4 px-3  flex flex-col items-center  relative">
        <OpenSidebarButton />

        {children}
      </div>
    </div>
  );
};

export default RootLayout;
