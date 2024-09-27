import { Alert, debounce, Grid2, styled } from "@mui/material";
import { SearchInput } from "./SearchInput";
import { useState } from "react";
import useSearchPlayers from "@/helpers/useSearchPlayers";
import { PlayersResults } from "./PlayerResults";

export default function Search() {
	const [query, setQuery] = useState("");
	const { players, isLoading, error, loadMorePlayers } = useSearchPlayers({ query });

	const handleChange = debounce((val: string) => {
		setQuery(val);
	});

	return (
		<SearchWrapper size={{ xs: 8, sm: 6 }}>
			<SearchInput onSearch={handleChange} />
			{!!query && !error && (
				<PlayersResults players={players} isLoading={isLoading} loadMorePlayers={loadMorePlayers} />
			)}
			{error && (
				<Alert sx={{ my: 2 }} severity='error'>
					{error.message}
				</Alert>
			)}
		</SearchWrapper>
	);
}

const SearchWrapper = styled(Grid2)(({ theme }) => ({
	height: "calc(100vh - 64px)",
	overflow: "hidden",
	backgroundColor: theme.palette.background.default,
	borderRight: `2px solid ${theme.palette.background.default}`,
	padding: theme.spacing(1),
	"@media (max-width: 600px)": {
		height: "auto",
		maxHeight: "40vh",
		borderRight: "none",
		borderBottom: `2px solid ${theme.palette.background.default}`,
	},
}));
