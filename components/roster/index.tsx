import { Alert, Box, Grid2, Paper, styled, Typography } from "@mui/material";
import { FavoritePlayers } from "./FavoritePlayers";
import useFetchStats from "@/helpers/useFetchStats";
import SportsBasketballRoundedIcon from "@mui/icons-material/SportsBasketballRounded";
import { usePlayerContext } from "@/store/PlayersContext";

export default function Roster() {
	const { players, isFetchingPlayers } = usePlayerContext();
	const { updatedPlayers, isLoadingStats, error } = useFetchStats({ players });

	return (
		<RosterWrapper columns={1} size={{ xs: 8, sm: 14 }}>
			<RosterContainer>
				<Typography variant='h5' mb={2}>
					My Players
				</Typography>
				{error && <Alert severity='error'>{error.message}</Alert>}
				<FavoritePlayers isLoadingStats={isLoadingStats} players={updatedPlayers} />
				{players.length === 0 && !isFetchingPlayers && (
					<Box mt={4} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
						<SportsBasketballRoundedIcon fontSize='large' color='warning' />
						<Typography mt={4} variant='body1' color='warning'>
							No players in your roster! Search for players to add, on the left.
						</Typography>
					</Box>
				)}
			</RosterContainer>
		</RosterWrapper>
	);
}

const RosterWrapper = styled(Grid2)(({ theme }) => ({
	height: "calc(100vh - 64px)",
	overflow: "hidden",
	backgroundColor: theme.palette.grey[50],
	padding: theme.spacing(4),
	"@media (max-width: 600px)": {
		padding: theme.spacing(1),
	},
}));

const RosterContainer = styled(Paper)(({ theme }) => ({
	overflow: "hidden",
	height: "100%",
	backgroundColor: theme.palette.common.white,
	padding: theme.spacing(2),
}));
