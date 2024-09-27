import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handleAddPlayer(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}
	const player = req.body;
	try {
		const newPlayer = await prisma.players.create({
			data: {
				id: player.id,
				first_name: player.first_name,
				last_name: player.last_name,
				position: player.position,
				jersey_number: player.jersey_number,
				team: {
					connectOrCreate: {
						where: {
							id: player.team.id,
						},
						create: {
							id: player.team.id,
							full_name: player.team.full_name,
							name: player.team.name,
							abbreviation: player.team.abbreviation,
						},
					},
				},
			},
		});
		res.status(201).json(newPlayer);
	} catch (error) {
		console.error("Error adding player:", error);
		res.status(500).json({ error: "Failed to add player" });
	} finally {
		await prisma.$disconnect();
	}
}
