import { SchoolAddSchema } from "~/shared/schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const schoolRouter = createTRPCRouter({
	create: protectedProcedure.input(SchoolAddSchema).mutation(({ input }) => {
		// TODO: Set up School table
		console.log({ input });
		return input;
	}),
	findMany: publicProcedure.query(() => {
		return [
			{
				id: "NytEqLA7nr",
				name: "Guiomar de Campos Miranda",
				city: "Barra do Bugres",
				studentsQuantity: 101,
				phoneNumber: "(68) 5778-0487",
			},
			{
				id: "lJcBxwkY2N",
				name: "Alfredo José da Silva",
				city: "Barra do Bugres",
				studentsQuantity: 99,
				phoneNumber: "(47) 28806-8671",
			},
			{
				id: "aUu7wby9ei",
				name: "Ee Indígena Jula Pare",
				city: "Barra do Bugres",
				studentsQuantity: 71,
				phoneNumber: "(85) 1072-0179",
			},
			{
				id: "dskgLKKIVb",
				name: "Herculano Borges",
				city: "Barra do Bugres",
				studentsQuantity: 69,
				phoneNumber: "(83) 7370-2389",
			},
		];
	}),
});
