import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handlePlayers(req: NextApiRequest, res: NextApiResponse) {
	try {
		const players = await prisma.players.findMany({
			include: {
				team: true,
			},
			take: 15,
		});
		res.json(players);
	} catch (error) {
		console.error("Error fetching players:", error);
		res.status(500).json({ error: "Failed to fetch players" });
	} finally {
		await prisma.$disconnect();
	}
}
