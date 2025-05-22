"use client";
import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { app } from "@/services/axios/axios.config";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2 } from "lucide-react";

interface ResponseData {
  data: {
    id: string;
    username: string;
    token: string;
  };
}

const loginSchema = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string().min(6, "Senha muito curta!"),
});

type loginTypes = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<loginTypes>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = useFormState({ control: form.control });

  async function handleForm({ email, password }: loginTypes) {
    try {
      const response: ResponseData = await app.post("/users/session", {
        email,
        password,
      });

      await fetch("/api/set-token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: response.data.token }),
      });

      form.reset();

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.data.error) {
          case "Invalid credentials":
            form.setError("root", { message: "Email ou senha inválidos" });
            return;

          default:
            break;
        }
      }
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleForm)}
            className="grid grid-cols-1 gap-4"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Digite seu email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Entrar"}
            </Button>
            <div className="mt-4 flex gap-2 text-sm">
              <p>Não tem uma conta?</p>
              <Link href="/cadastro" className="text-blue-500">
                Cadastre-se
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
