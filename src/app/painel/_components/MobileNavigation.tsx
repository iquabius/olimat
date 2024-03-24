import Link from "next/link";
import { Menu, Package2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

export function MobileNavigation() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0 md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<nav className="grid gap-6 text-lg font-medium">
					<Link
						href="#"
						className="flex items-center gap-2 text-lg font-semibold"
					>
						<Package2 className="h-6 w-6" />
						<span className="sr-only">Acme Inc</span>
					</Link>
					<Link href="#" className="hover:text-foreground">
						Painel
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Escolas
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Cidades
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Provas
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Questões
					</Link>
					<Link
						href="#"
						className="text-muted-foreground hover:text-foreground"
					>
						Olimpíadas
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
