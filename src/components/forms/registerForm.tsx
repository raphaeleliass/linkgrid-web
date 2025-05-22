"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { app } from "@/services/axios/axios.config";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Seu nome deve ter 2 letras no mínimo!").trim(),
  username: z
    .string()
    .nonempty("Username não pode estar vazio!")
    .refine((val) => !val.includes(" "), "Username não pode conter espaços!"),
  email: z.string().email("Email inválido!"),
  password: z.string().min(6, "Sua senha é muito curta!"),
});

type registerTypes = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<registerTypes>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const email = sessionStorage.getItem("email");

    if (!email) return;

    form.setValue("email", email);

    sessionStorage.removeItem("email");
  }, []);

  async function handleForm({
    name,
    username,
    email,
    password,
  }: registerTypes) {
    try {
      await app.post("/users/create", {
        name: name,
        username: username,
        email: email,
        password: password,
      });
      form.reset();
      router.push("/entrar");
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.data.error) {
          case "Username is already in use":
            form.setError("username", {
              message: "Este username já está em uso",
            });
            return;

          case "Email is already in use":
            form.setError("email", {
              message: "Este email já está em uso",
            });
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
        <CardTitle className="text-2xl">Cadastre-se</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleForm)}
            className="grid grid-cols-1 gap-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Cadastrar
            </Button>

            <div className="mt-4 flex gap-2 text-sm">
              <p>Já tem uma conta?</p>{" "}
              <Link href={"/entrar"} className="text-blue-500">
                Clique aqui
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
