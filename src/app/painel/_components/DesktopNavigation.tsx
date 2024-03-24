import Link from "next/link";
import { Package2 } from "lucide-react";

export function DesktopNavigation() {
	return (
		<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
			<Link
				href="#"
				className="flex items-center gap-2 text-lg font-semibold md:text-base"
			>
				<Package2 className="h-6 w-6" />
				<span className="sr-only">Acme Inc</span>
			</Link>
			<Link
				href="#"
				className="text-foreground transition-colors hover:text-foreground"
			>
				Painel
			</Link>
			<Link
				href="/painel/escolas"
				className="text-muted-foreground transition-colors hover:text-foreground"
			>
				Escolas
			</Link>
			<Link
				href="#"
				className="text-muted-foreground transition-colors hover:text-foreground"
			>
				Cidades
			</Link>
			<Link
				href="#"
				className="text-muted-foreground transition-colors hover:text-foreground"
			>
				Provas
			</Link>
			<Link
				href="#"
				className="text-muted-foreground transition-colors hover:text-foreground"
			>
				Questões
			</Link>
			<Link
				href="#"
				className="text-muted-foreground transition-colors hover:text-foreground"
			>
				Olimpíadas
			</Link>
		</nav>
	);
}
