"use client";

import { type ColumnDef } from "@tanstack/react-table";

// We can use Zod schema here if we want
export type School = {
	id: string;
	name: string;
	city: string;
	phoneNumber: string;
};

export const columns: ColumnDef<School>[] = [
	{
		accessorKey: "name",
		header: "Nome",
	},
	{
		accessorKey: "city",
		header: "Cidade",
	},
	{
		accessorKey: "phoneNumber",
		header: "Telefone",
	},
];
