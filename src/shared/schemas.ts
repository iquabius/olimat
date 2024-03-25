import { z } from "zod";

export const SchoolAddSchema = z.object({
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
