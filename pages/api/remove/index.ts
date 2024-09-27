import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handleDeletePlayer(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "DELETE") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { id } = req.query;

	try {
		const deletedPlayer = await prisma.players.delete({
			where: {
				id: parseInt(id as string),
			},
		});

		res.status(200).json({ message: "Player deleted successfully", player: deletedPlayer });
	} catch (error) {
		console.error("Error deleting player:", error);
		res.status(500).json({ error: "Failed to delete player" });
	} finally {
		await prisma.$disconnect();
	}
}
