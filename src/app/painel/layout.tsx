import { DesktopNavigation } from "./_components/DesktopNavigation";
import { MobileNavigation } from "./_components/MobileNavigation";
import { SearchInput } from "./_components/SearchInput";
import { UserMenu } from "./_components/UserMenu";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<DesktopNavigation />
				<MobileNavigation />
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<SearchInput />
					<UserMenu />
				</div>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				{children}
			</main>
		</div>
	);
}
