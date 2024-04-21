import { DataTable } from "../escolas/_components/data-table/data-table";
import { columns, type City } from "./_components/columns";

export default async function DashboardCitiesPage() {
	const data = await getData();

	return <DataTable columns={columns} data={data} />;
}

const getData: () => Promise<City[]> = async () => {
	return [
		{
			id: "m9vbB1SsCV",
			name: "Barra do Bugres",
			schoolsQuantity: 13,
			studentsQuantity: 101,
		},
		{
			id: "TDO7Xk4Mey",
			name: "Cáceres",
			schoolsQuantity: 15,
			studentsQuantity: 121,
		},
		{
			id: "O6AnrwBAl9",
			name: "Sinop",
			schoolsQuantity: 8,
			studentsQuantity: 99,
		},
	];
};
