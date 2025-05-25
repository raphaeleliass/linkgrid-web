import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, CircleHelp, Pencil, Trash2 } from "lucide-react";

interface LinksTableProps {
  links: any[];
  loading: boolean;
  onEdit: (link: any) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
}

export function LinksTable({
  links,
  loading,
  onEdit,
  onDelete,
  formatDate,
}: LinksTableProps) {
  return (
    <Table>
      <TableCaption>
        {links.length === 0 ? "Você não possui links" : "Lista com seus links"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          {["Título", "URL", "Atualizado em", "Criado em", "Ações"].map(
            (item, index) => (
              <TableHead key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="flex flex-row items-center gap-2">
                      {item}
                      <CircleHelp size={14} />
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    {item === "Título" && "Esse é o título do seu link"}
                    {item === "URL" && "Esse é o endereço do seu link"}
                    {item === "Atualizado em" &&
                      "Quando seu link foi atualizado pela última vez"}
                    {item === "Criado em" && "Quando seu link foi criado"}
                    {item === "Ações" && "Crie, edite ou apague links"}
                  </TooltipContent>
                </Tooltip>
              </TableHead>
            ),
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: 3 }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: 5 }, (_, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton className="h-12" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : links.map((link, index) => (
              <TableRow key={index}>
                <TableCell className=" truncate max-w-12">{link.title}</TableCell>
                <TableCell  className=" truncate max-w-12">
                  <a
                    className="text-blue-500 hover:underline"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {link.href}
                  </a>
                </TableCell>
                <TableCell>{formatDate(link.updated_at)}</TableCell>
                <TableCell>{formatDate(link.created_at)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant={"ghost"} asChild>
                        <ChevronDown size={64} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background w-56 rounded-lg border drop-shadow-2xl">
                      <DropdownMenuGroup className="space-y-2">
                        <DropdownMenuItem>
                          <Button
                            className="w-full justify-between"
                            variant={"ghost"}
                            onClick={() => onEdit(link)}
                          >
                            Editar <Pencil />
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            className="w-full justify-between"
                            variant={"ghost"}
                            onClick={() => onDelete(link.id)}
                          >
                            Excluir <Trash2 />
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
