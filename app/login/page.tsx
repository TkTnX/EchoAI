import { AuthForm } from "@/components/AuthForm";
const LoginPage = () => {
  return (
    <div className="max-w-[400px]  flex flex-col w-full h-full justify-center items-center  gap-4">
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;
