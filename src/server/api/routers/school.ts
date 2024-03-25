import { SchoolAddSchema } from "~/shared/schemas";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const schoolRouter = createTRPCRouter({
	create: protectedProcedure
		.input(SchoolAddSchema)
		.mutation(({ ctx, input }) => {
			// TODO: Set up School table
			console.log({ input });
			return input;
		}),
});
