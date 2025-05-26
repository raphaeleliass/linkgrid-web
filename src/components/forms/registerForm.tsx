"use client";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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
import { Loader2 } from "lucide-react";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Seu nome deve ter 2 letras no mínimo!")
    .max(24, "Nome muito grande")
    .regex(/^[a-zA-Z0-9._]+$/, "Nome inválido")
    .trim(),
  username: z
    .string()
    .nonempty("Username não pode estar vazio!")
    .max(24, "Username muito grande")
    .regex(/^[a-zA-Z0-9._]+$/, "Username inválido")
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

  const { isSubmitting } = useFormState({ control: form.control });

  useEffect(() => {
    const email = sessionStorage.getItem("email");

    if (!email) return;

    form.setValue("email", email);

    sessionStorage.removeItem("email");
  }, [form]);

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
                    <Input
                      disabled={isSubmitting}
                      placeholder="Digite seu nome"
                      {...field}
                    />
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
                    <Input
                      disabled={isSubmitting}
                      placeholder="Digite seu username"
                      {...field}
                    />
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="mt-4">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Cadastrar"
              )}
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
