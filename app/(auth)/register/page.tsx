import { AuthForm } from "@/components/AuthForm";
const RegisterPage = () => {
  return (
    <div className="max-w-[400px]  flex flex-col w-full h-full justify-center items-center  gap-4">
      <AuthForm type="register" />
    </div>
  );
};

export default RegisterPage;
