import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { app } from "@/services/axios/axios.config";
import { getToken } from "@/services/actions/getToken";
import { updateLink } from "@/services/links/link.actions";

const editLinkSchema = z.object({
  title: z.string().nonempty("Este campo não pode estar vazio").optional(),
  href: z
    .string()
    .url("Url inválida")
    .nonempty("Este campo não pode estar vazio")
    .optional(),
});

type LinkTypes = z.infer<typeof editLinkSchema>;

interface EditLinkDialogProps {
  open: boolean;
  title: string;
  href: string;
  id: string;
  onTitleChange: (value: string) => void;
  onHrefChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export function EditLinkForm({
  open,
  title,
  href,
  id,
  onTitleChange,
  onHrefChange,
  onClose,
  onSave,
}: EditLinkDialogProps) {
  const form = useForm<LinkTypes>({
    resolver: zodResolver(editLinkSchema),
    defaultValues: {
      title: title || "",
      href: href || "",
    },
    values: { title, href },
  });
  const { isSubmitting } = useFormState({ control: form.control });

  async function submitForm({ href, title }: LinkTypes) {
    await updateLink({ title, href, id });
    onSave();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onTitleChange(e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="href"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        onHrefChange(e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={onClose}
                type="button"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
