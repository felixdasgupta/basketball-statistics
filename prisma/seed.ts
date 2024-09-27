import prisma from "../lib/prisma";

async function main() {
	const curry = await prisma.players.create({
		data: {
			id: 115,
			first_name: "Stephen",
			last_name: "Curry",
			position: "PG",
			jersey_number: "30",
			team: {
				create: {
					id: 10,
					name: "Warriors",
					full_name: "Golden State Warriors",
					abbreviation: "GSW",
				},
			},
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
