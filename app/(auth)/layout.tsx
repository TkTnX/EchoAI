const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 bg-foreground h-full rounded-[10px] py-4 px-3  flex flex-col items-center  relative">
      {children}
    </main>
  );
};

export default AuthLayout;
