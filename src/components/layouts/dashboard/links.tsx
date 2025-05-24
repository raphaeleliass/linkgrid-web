import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/userContext";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, CircleHelp } from "lucide-react";

export default function Links() {
  const { user } = useUser();

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

  return (
    <div>
      <p className="text-2xl font-semibold md:text-3xl">Seus links</p>

      <div className="mt-12">
        <Table>
          <TableCaption>
            {user?.links.length === 0
              ? "Você não possui links"
              : "Lista com seus links"}
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
            {user?.links.map((link, index) => (
              <TableRow key={index}>
                <TableCell>{link.title}</TableCell>
                <TableCell>
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
                    <DropdownMenuContent className="w-56 bg-background border">
                      <DropdownMenuLabel>
                        Ações para seus links
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>teste</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
