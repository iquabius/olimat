import * as React from "react";

import { cn } from "~/lib/utils";
import { useMediaQuery } from "~/hooks/use-media-query";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Plus } from "lucide-react";

export function SchoolAddDialog() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Adicionar
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Adicionar Escola</DialogTitle>
						<DialogDescription>
							Adicione uma escola aqui. Clique salvar quando estiver pronto.
						</DialogDescription>
					</DialogHeader>
					<SchoolAddForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Adicionar
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Adicionar Escola</DrawerTitle>
					<DrawerDescription>
						Adicione uma escola aqui. Clique salvar quando estiver pronto.
					</DrawerDescription>
				</DrawerHeader>
				<SchoolAddForm className="px-4" />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function SchoolAddForm({ className }: React.ComponentProps<"form">) {
	return (
		<form className={cn("grid items-start gap-4", className)}>
			<div className="grid gap-2">
				<Label htmlFor="name">Nome</Label>
				<Input id="name" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="phoneNumber">Telefone</Label>
				<Input id="phoneNumber" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="pedagogicalCoordinator">Coordenador Pedagógico</Label>
				<Input id="pedagogicalCoordinator" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="principal">Diretor</Label>
				<Input id="principal" />
			</div>
			<Button type="submit">Salvar</Button>
		</form>
	);
}
