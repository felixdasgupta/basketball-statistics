/* eslint-disable react-hooks/exhaustive-deps */
import { BDL_API_KEY, BDL_API_URL } from "@/utils/constants";
import { FavoritePlayer, PlayerStats } from "@/utils/types";
import { useState, useEffect } from "react";

interface UseFetchPlayerStatsProps {
	players: FavoritePlayer[];
}

function useFetchStats({ players }: UseFetchPlayerStatsProps) {
	const [updatedPlayers, setUpdatedPlayers] = useState<FavoritePlayer[]>(players);
	const [isLoadingStats, setIsLoadingStats] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchPlayerStats = async () => {
		setIsLoadingStats(true);
		setError(null);

		try {
			const url = new URL(`${BDL_API_URL}season_averages`);
			url.searchParams.set("season", "2023"); // Replace with desired seasons
			players.forEach((player) => {
				url.searchParams.append("player_ids[]", player.id.toString());
			});

			const response = await fetch(url.toString(), {
				headers: {
					Authorization: `${BDL_API_KEY}`,
				},
			});

			if (!response.ok) {
				throw new Error(`Error fetching player stats: ${response.statusText}`);
			}

			const data = await response.json();
			const playerStatsMap = data.data.reduce((acc: { [id: number]: PlayerStats }, stat: PlayerStats) => {
				acc[stat.player_id] = stat;
				return acc;
			}, {} as { [id: number]: PlayerStats });
			setUpdatedPlayers(
				players.map((player) => ({
					...player,
					stats: playerStatsMap[player.id] ?? null,
				}))
			);
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoadingStats(false);
		}
	};

	useEffect(() => {
		if (players.length > 0) {
			fetchPlayerStats();
		}
	}, [players]);

	useEffect(() => {
		if (error) {
			const timeoutId = setTimeout(() => {
				setError(null);
			}, 6000);

			return () => clearTimeout(timeoutId);
		}
	}, [error]);

	return { updatedPlayers, isLoadingStats, error };
}

export default useFetchStats;
