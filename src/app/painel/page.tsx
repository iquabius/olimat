import Link from "next/link";
import {
	ArrowUpRight,
	CircleUser,
	FileQuestion,
	LandPlot,
	School,
	Search,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { DesktopNavigation } from "./_components/DesktopNavigation";
import { MobileNavigation } from "./_components/MobileNavigation";

export default function Dashboard() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<DesktopNavigation />
				<MobileNavigation />
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<form className="ml-auto flex-1 sm:flex-initial">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Pesquisar escolas..."
								className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
							/>
						</div>
					</form>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Configurações</DropdownMenuItem>
							<DropdownMenuItem>Suporte</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Sair</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total de Escolas
							</CardTitle>
							<School className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">143</div>
							<p className="text-xs text-muted-foreground">+24 no último mês</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Escolas Pendentes
							</CardTitle>
							<School className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">18</div>
							<p className="text-xs text-muted-foreground">
								4 pendentes há mais de um mês
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Questões Publicadas
							</CardTitle>
							<FileQuestion className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">666</div>
							<p className="text-xs text-muted-foreground">
								133 publicadas este ano
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Cidades</CardTitle>
							<LandPlot className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">25</div>
							<p className="text-xs text-muted-foreground">+9 no último ano</p>
						</CardContent>
					</Card>
				</div>
				<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					<Card className="xl:col-span-2">
						<CardHeader className="flex flex-row items-center">
							<div className="grid gap-2">
								<CardTitle>Escolas</CardTitle>
								<CardDescription>
									Escolas cadastradas recentemente.
								</CardDescription>
							</div>
							<Button asChild size="sm" className="ml-auto gap-1">
								<Link href="#">
									Ver Todas
									<ArrowUpRight className="h-4 w-4" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Escola</TableHead>
										<TableHead className="hidden xl:table-column">
											Type
										</TableHead>
										<TableHead className="hidden xl:table-column">
											Status
										</TableHead>
										<TableHead className="hidden xl:table-column">
											Data
										</TableHead>
										<TableHead className="text-right">Alunos</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>
											<div className="font-medium">
												Guiomar de Campos Miranda
											</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												guiomar.miranda@escola.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Sale
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-23
										</TableCell>
										<TableCell className="text-right">26</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">Alfredo José da Silva</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												alfredo.jose@escola.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Refund
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Declined
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-24
										</TableCell>
										<TableCell className="text-right">19</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">
												CESC - Centro Educacional Santa Cruz
											</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												cesc@escola.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Subscription
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-25
										</TableCell>
										<TableCell className="text-right">22</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">Herculano Borges</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												herculano.borge@escola.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Sale
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-26
										</TableCell>
										<TableCell className="text-right">25</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">Ee Indígena Jula Pare</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												bbg.eei.jula.pare@seduc.mt.gov.br
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Sale
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-27
										</TableCell>
										<TableCell className="text-right">27</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Usuários</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-8">
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/01.png" alt="Avatar" />
									<AvatarFallback>OM</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Olívia Martins
									</p>
									<p className="text-sm text-muted-foreground">
										olivia.martins@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									<Badge variant="outline">Verificado</Badge>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/02.png" alt="Avatar" />
									<AvatarFallback>JL</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">Jean Lee</p>
									<p className="text-sm text-muted-foreground">
										jean.lee@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									<Badge>Pendente</Badge>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/03.png" alt="Avatar" />
									<AvatarFallback>IN</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Isabela Neves
									</p>
									<p className="text-sm text-muted-foreground">
										isabela.neves@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									<Badge variant="outline">Verificado</Badge>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/04.png" alt="Avatar" />
									<AvatarFallback>WM</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Wagner Moura
									</p>
									<p className="text-sm text-muted-foreground">
										wagner.moura@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									<Badge>Pendente</Badge>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage src="/avatars/05.png" alt="Avatar" />
									<AvatarFallback>SL</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">Sofia Lima</p>
									<p className="text-sm text-muted-foreground">
										sofia.lima@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									<Badge variant="outline">Verificado</Badge>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
