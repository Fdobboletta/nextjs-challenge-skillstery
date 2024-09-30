"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/app/utils/api";
import { RegisterUserResponse } from "@/app/api/auth/register/types";
import { routePaths } from "@/app/routePaths";
import { InputField } from "@/components/InputField";

type RegisterFormFields = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>();

  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
      }

      const newUser = await apiFetch<RegisterUserResponse>({
        path: "/api/auth/register",
        method: "POST",
        body: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        },
      });

      if (newUser) {
        router.push(routePaths.login);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  });

  return (
    <div className="w-full h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <InputField
          label="First Name:"
          type="text"
          placeholder="John"
          register={register("firstName", {
            required: { value: true, message: "First name is required" },
          })}
          error={errors.firstName}
        />
        <InputField
          label="Last Name:"
          type="text"
          placeholder="Doe"
          register={register("lastName", {
            required: { value: true, message: "Last name is required" },
          })}
          error={errors.lastName}
        />
        <InputField
          label="Email:"
          type="email"
          placeholder="user@email.com"
          register={register("email", {
            required: { value: true, message: "Email is required" },
          })}
          error={errors.email}
        />
        <InputField
          label="Password:"
          type="password"
          placeholder="********"
          register={register("password", {
            required: { value: true, message: "Password is required" },
          })}
          error={errors.password}
        />
        <InputField
          label="Confirm Password:"
          type="password"
          placeholder="********"
          register={register("confirmPassword", {
            required: { value: true, message: "Confirm Password is required" },
          })}
          error={errors.confirmPassword}
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
