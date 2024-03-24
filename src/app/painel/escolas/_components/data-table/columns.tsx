"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";

// We can use Zod schema here if we want
export type School = {
	id: string;
	name: string;
	city: string;
	phoneNumber: string;
	studentsQuantity: number;
};

export const columns: ColumnDef<School>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Nome
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "city",
		header: "Cidade",
	},
	{
		accessorKey: "studentsQuantity",
		header: "Alunos",
	},
	{
		accessorKey: "phoneNumber",
		header: "Telefone",
	},
];
