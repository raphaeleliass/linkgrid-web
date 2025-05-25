"use client";
import { useUser } from "@/context/userContext";
import { deleteLink, updateLink } from "@/services/links/link.actions";

import { useEffect, useState } from "react";
import { LinksTable } from "./LinksTable";
import { EditLinkForm } from "@/components/forms/editLinkForm";

export default function Links() {
  const { user, loading } = useUser();
  const [links, setLinks] = useState(user?.links || []);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editHref, setEditHref] = useState("");

  useEffect(() => {
    setLinks(user?.links || []);
  }, [user]);

  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .format(new Date(dateString))
      .split(",")
      .join(" às");
  }

  async function HandleDeleteLink({ id }: { id: string }) {
    await deleteLink({ id });
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  function openEditDialog(link: any) {
    setSelectedLink(link);
    setEditTitle(link.title);
    setEditHref(link.href);
    setEditDialogOpen(true);
  }

  function closeEditDialog() {
    setEditDialogOpen(false);
    setSelectedLink(null);
  }

  async function handleEditSave() {
    if (!selectedLink) return;
    try {
      await updateLink({
        id: selectedLink.id,
        title: editTitle,
        href: editHref,
      });
      setLinks((prev) =>
        prev.map((link) =>
          link.id === selectedLink.id
            ? {
                ...link,
                title: editTitle,
                href: editHref,
                updated_at: new Date().toISOString(),
              }
            : link,
        ),
      );
      setEditDialogOpen(false);
      setSelectedLink(null);
    } catch (err) {
      console.error("Erro ao atualizar o link:", err);
    }
  }

  return (
    <div>
      <p className="text-2xl font-semibold md:text-3xl">Seus links</p>
      <div className="mt-12">
        <LinksTable
          links={links}
          loading={loading}
          onEdit={openEditDialog}
          onDelete={(id) => HandleDeleteLink({ id })}
          formatDate={formatDate}
        />
      </div>
      <EditLinkForm
        id={selectedLink?.id || ""}
        open={editDialogOpen}
        title={editTitle}
        href={editHref}
        onTitleChange={setEditTitle}
        onHrefChange={setEditHref}
        onClose={closeEditDialog}
        onSave={handleEditSave}
      />
    </div>
  );
}
