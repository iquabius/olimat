"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";

export type City = {
	id: string;
	name: string;
	schoolsQuantity: number;
	studentsQuantity: number;
};

export const columns: ColumnDef<City>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Nome
					<ArrowUpDown className="ml-2 size-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "schoolsQuantity",
		header: "Escolas",
	},
	{
		accessorKey: "studentsQuantity",
		header: "Alunos",
	},
];
