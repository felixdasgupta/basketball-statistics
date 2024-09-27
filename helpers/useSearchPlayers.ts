import { BDL_API_KEY, BDL_API_URL } from "@/utils/constants";
import { Player } from "@/utils/types";
import { useState, useEffect } from "react";

interface SearchPlayersProps {
	query?: string;
	perPage?: number;
}

function useSearchPlayers({ query = "", perPage = 25 }: SearchPlayersProps) {
	const [players, setPlayers] = useState<Player[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [hasNextPage, setHasNextPage] = useState(false);
	const [cursor, setCursor] = useState<number | null>(null);

	useEffect(() => {
		if (query) {
			fetchPlayers();
		}

		return () => {
			setPlayers([]);
			setIsLoading(false);
			setError(null);
			setHasNextPage(false);
			setCursor(null);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	useEffect(() => {
		if (error) {
			const timeoutId = setTimeout(() => {
				setError(null);
			}, 6000);

			return () => clearTimeout(timeoutId);
		}
	}, [error]);

	const fetchPlayers = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const url = new URL(`${BDL_API_URL}players`);
			const [firstName, lastName] = query.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");

			if (firstName && lastName) {
				url.searchParams.set("first_name", firstName);
				url.searchParams.set("last_name", lastName);
			} else {
				url.searchParams.set("search", firstName);
			}

			url.searchParams.set("per_page", perPage.toString());
			if (cursor) {
				url.searchParams.set("cursor", cursor.toString());
			}

			const response = await fetch(url.toString(), {
				headers: {
					Authorization: `${BDL_API_KEY}`,
				},
			});

			if (!response.ok) {
				setError(Error(`Error fetching players: ${response.statusText}`));
			}

			const data = await response.json();
			setPlayers((prevPlayers) => (cursor ? [...prevPlayers, ...data.data] : data.data));
			setHasNextPage(!!data.meta?.next_cursor);
			setCursor(data.meta?.next_cursor || null);
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const loadMorePlayers = async () => {
		if (!isLoading && hasNextPage) {
			await fetchPlayers();
		}
	};

	return { players, isLoading, error, hasNextPage, loadMorePlayers };
}

export default useSearchPlayers;
