import { DataTable } from "./_components/data-table/data-table";
import { columns, type School } from "./_components/data-table/columns";

export default async function DashboardSchoolsPage() {
	const data = await getData();

	return <DataTable columns={columns} data={data} />;
}

const getData: () => Promise<School[]> = async () => {
	return [
		{
			id: "NytEqLA7nr",
			name: "Guiomar de Campos Miranda",
			city: "Barra do Bugres",
			phoneNumber: "(68) 5778-0487",
		},
		{
			id: "lJcBxwkY2N",
			name: "Alfredo José da Silva",
			city: "Barra do Bugres",
			phoneNumber: "(47) 28806-8671",
		},
		{
			id: "aUu7wby9ei",
			name: "Ee Indígena Jula Pare",
			city: "Barra do Bugres",
			phoneNumber: "(85) 1072-0179",
		},
		{
			id: "dskgLKKIVb",
			name: "Herculano Borges",
			city: "Barra do Bugres",
			phoneNumber: "(83) 7370-2389",
		},
	];
};
