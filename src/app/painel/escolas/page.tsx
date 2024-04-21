import { DataTable } from "./_components/data-table/data-table";
import { columns } from "./_components/data-table/columns";
import { api } from "~/trpc/server";

export default async function DashboardSchoolsPage() {
	const data = await api.school.findMany();

	return <DataTable columns={columns} data={data} />;
}
