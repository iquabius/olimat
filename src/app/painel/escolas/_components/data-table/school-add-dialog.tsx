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
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";

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

const SchoolAddSchema = z.object({
	name: z.string().min(3, {
		message: "Nome deve ter pelo menos 3 caracteres.",
	}),
	email: z.string().email(),
	phoneNumber: z.string(),
	pedagogicalCoordinator: z.string().min(3, {
		message: "Nome do coordenador pedagógico deve ter pelo menos 3 caracteres.",
	}),
	principal: z.string().min(3, {
		message: "Nome do diretor deve ter pelo menos 3 caracteres.",
	}),
});

function SchoolAddForm({ className }: React.ComponentProps<"form">) {
	const form = useForm<z.infer<typeof SchoolAddSchema>>({
		resolver: zodResolver(SchoolAddSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = (values: z.infer<typeof SchoolAddSchema>) => {
		// Do something
		console.log({ values });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn("grid items-start gap-4", className)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>Nome da escola.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telefone</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pedagogicalCoordinator"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Coordenador Pedagógico</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="principal"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Diretor</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Salvar</Button>
			</form>
		</Form>
	);
}
