"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import authStore from "@/store/auth";
import { useRouter } from "next/navigation";

interface FormState {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { setUser } = authStore();
  const router = useRouter();

  const { handleSubmit, register } = useForm<FormState>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormState> = async ({ email, password }) => {
    setUser({ email, password });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email address"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="passwword"
            id="passwword"
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>
      </div>

      <Button className="mt-3" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
