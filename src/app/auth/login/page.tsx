"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { InputField } from "@/components/InputField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { routePaths } from "@/app/routePaths";

type LoginFormFields = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (formData) => {
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res && res.error) {
      setError(res.error);
    } else {
      router.push(routePaths.inbox);
      router.refresh();
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
            {error}
          </p>
        )}
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        <InputField
          label="Email:"
          type="text"
          placeholder="johndoe@gmail.com"
          register={register("email", {
            required: { value: true, message: "Email is required" },
          })}
          error={errors.email}
        />
        <InputField
          label="Password:"
          type="password"
          placeholder="******"
          register={register("password", {
            required: { value: true, message: "Password is required" },
          })}
          error={errors.password}
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
