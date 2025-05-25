import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { app } from "@/services/axios/axios.config";
import { getToken } from "@/services/actions/getToken";
import { Button } from "../ui/button";
import { useUser } from "@/context/userContext";

const createLinkSchema = z.object({
  title: z.string().nonempty("Este campo não pode estar vazio"),
  href: z
    .string()
    .url("Link inválido")
    .nonempty("Este campo não pode estar vazio"),
});

type FormData = z.infer<typeof createLinkSchema>;

export default function CreateLinkForm() {
  const { refreshUser } = useUser();
  const form = useForm({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      title: "",
      href: "",
    },
  });
  async function submitForm({ title, href }: FormData) {
    try {
      const token = await getToken();
      const response = await app.post(
        "/links/create",
        { title, href },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      await fetch("/api/revalidate");
      await refreshUser();

      form.reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data);
      }
    }
  }

  return (
    <Card className="container max-w-xl">
      <CardHeader>
        <CardTitle>Adicione um link</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o titulo do seu link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="href"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Cole o link aqui" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Adicionando..." : "Adicionar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
