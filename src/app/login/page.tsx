"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const LoginForm = dynamic(() => import("@/components/auth/login-form"), {
  ssr: false,
});
import authStore from "@/store/auth";

const Login = () => {
  const { user } = authStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <section className="grid place-content-center">
      <LoginForm />
    </section>
  );
};

export default Login;
