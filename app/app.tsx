"use client";
import Roster from "@/components/roster";
import Search from "@/components/search";
import PlayersProvider from "@/store/PlayersContext";
import { Grid2 } from "@mui/material";

export default function App() {
	return (
		<Grid2 container columns={{ xs: 8, sm: 20 }}>
			<PlayersProvider>
				<Search />
				<Roster />
			</PlayersProvider>
		</Grid2>
	);
}
