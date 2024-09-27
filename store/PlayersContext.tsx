import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import { FavoritePlayer } from "@/utils/types";

const PlayersContext = createContext({
	players: [] as FavoritePlayer[],
	isFetchingPlayers: true,
	fetchingPlayersError: null as Error | null,
	addNewPlayer: (player: FavoritePlayer) => {},
	isAddingPlayer: false,
	addingPlayerError: null as Error | null,
	removePlayer: (player: FavoritePlayer) => {},
	isRemovingPlayer: false,
	removingPlayerError: null as Error | null,
});

function PlayersProvider({ children }: { children: React.ReactNode }) {
	const [players, setPlayers] = useState<FavoritePlayer[]>([]);
	const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false);
	const [isRemovingPlayer, setIsRemovingPlayer] = useState<boolean>(false);
	const [isFetchingPlayers, setIsFetchingPlayers] = useState<boolean>(true);
	const [addingPlayerError, setAddingPlayerError] = useState<Error | null>(null);
	const [removingPlayerError, setRemovingPlayerError] = useState<Error | null>(null);
	const [fetchingPlayersError, setFetchingPlayersError] = useState<Error | null>(null);

	const fetchPlayers = async () => {
		setIsFetchingPlayers(true);
		try {
			const fetchedPlayers = await fetch("/api/players").then((res) => res.json());
			setPlayers(fetchedPlayers as FavoritePlayer[]);
			setIsFetchingPlayers(false);
		} catch (error) {
			console.error("Error fetching players:", error);
			setFetchingPlayersError(error as Error);
			setIsFetchingPlayers(false);
		}
	};

	const addNewPlayer = async (player: FavoritePlayer) => {
		setIsAddingPlayer(true);
		try {
			const response = await fetch("/api/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(player),
			});
			if (!response.ok) {
				setIsAddingPlayer(false);
				setAddingPlayerError(new Error("Failed to add player"));
				return;
			}
			setPlayers((players) => [...players, player]);
			setIsAddingPlayer(false);
		} catch (error) {
			console.error("Error adding new player:", error);
			setIsAddingPlayer(false);
			setAddingPlayerError(error as Error);
		}
	};

	const removePlayer = async (player: FavoritePlayer) => {
		setIsRemovingPlayer(true);
		try {
			const response = await fetch(`/api/remove?id=${player.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				setIsRemovingPlayer(false);
				setRemovingPlayerError(new Error("Failed to delete player"));
				return;
			}
			setPlayers((players) => players.filter((p) => p.id !== player.id));
			setIsRemovingPlayer(false);
		} catch (error) {
			console.error("Error removing player:", error);
			setIsRemovingPlayer(false);
			setRemovingPlayerError(error as Error);
		}
	};

	useEffect(() => {
		fetchPlayers();
	}, []);

	useEffect(() => {
		if (removingPlayerError || fetchingPlayersError || addingPlayerError) {
			const timeoutId = setTimeout(() => {
				setRemovingPlayerError(null);
				setFetchingPlayersError(null);
				setAddingPlayerError(null);
			}, 6000);

			return () => clearTimeout(timeoutId);
		}
	}, [fetchingPlayersError, addingPlayerError, removingPlayerError]);

	const playerValue = useMemo(
		() => ({
			players,
			isFetchingPlayers,
			fetchingPlayersError,
			addNewPlayer,
			isAddingPlayer,
			addingPlayerError,
			removePlayer,
			isRemovingPlayer,
			removingPlayerError,
		}),
		[
			players,
			isFetchingPlayers,
			fetchingPlayersError,
			isAddingPlayer,
			addingPlayerError,
			isRemovingPlayer,
			removingPlayerError,
		]
	);

	return <PlayersContext.Provider value={playerValue}>{children}</PlayersContext.Provider>;
}

export const usePlayerContext = () => useContext(PlayersContext);
export default PlayersProvider;
