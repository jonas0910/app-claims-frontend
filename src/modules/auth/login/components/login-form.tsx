"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import { Button, EmailField, PasswordToggleField } from "@/core/components/ui";
import { type LoginInputsType, LoginSchema } from "../models/login-schema";
import { useLogin } from "../hooks/use-login";
import { BookOpenIcon } from "@heroicons/react/20/solid";

const LoginForm = () => {
  const form = useForm<LoginInputsType>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
  });

  const { loginFn, isPending } = useLogin();

  const onSubmit = async (data: LoginInputsType) => {
    const { status, success } = await loginFn(data);
    if (status === 200 && success) {
      form.reset();
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto px-6 py-6 rounded-xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-accent p-2 rounded-full shadow-lg shadow-indigo-500/20">
            <BookOpenIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Iniciar Sesión
          </h2>
        </div>

        <div className="flex flex-col gap-y-10">
          <div>
            <EmailField
              placeholder="Correo electrónico"
              inputName="email"
              inputError={form.formState.errors.email}
            />
            <PasswordToggleField
              inputName="password"
              inputError={form.formState.errors.password}
            />
          </div>

          <Button type="submit">
            {isPending ? <>Cargando...</> : "Iniciar Sesión"}
          </Button>
        </div>

        <div className="text-center text-sm text-gray-400 mt-6 hover:text-indigo-400 transition-colors duration-300">
          {/* <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a> */}
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
