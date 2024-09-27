import { usePlayerContext } from "@/store/PlayersContext";
import { FavoritePlayer, PlayerStats } from "@/utils/types";
import { Typography, styled, Skeleton, Box, Alert, Paper, CircularProgress, IconButton, Tooltip } from "@mui/material";
import SportsBasketballTwoToneIcon from "@mui/icons-material/SportsBasketballTwoTone";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { over } from "lodash";

interface FavoritePlayersProps {
	players: FavoritePlayer[];
	isLoadingStats: boolean;
}

export const FavoritePlayers = ({ players, isLoadingStats }: FavoritePlayersProps) => {
	const { removePlayer, removingPlayerError, isRemovingPlayer, isFetchingPlayers } = usePlayerContext();

	const handleDeleteAction = (player: FavoritePlayer) => {
		removePlayer(player);
	};

	if (isLoadingStats || isFetchingPlayers) {
		return (
			<FavoritePlayersStack>
				<Skeleton variant='rectangular' height={100} />
				<Skeleton variant='rectangular' height={100} />
				<Skeleton variant='rectangular' height={100} />
				<Skeleton variant='rectangular' height={100} />
				<Skeleton variant='rectangular' height={100} />
			</FavoritePlayersStack>
		);
	}

	return (
		<FavoritePlayersStack>
			{removingPlayerError && <Alert severity='error'>{removingPlayerError.message}</Alert>}
			{players.map((player) => (
				<FavoritePlayerItem
					isRemovingPlayer={isRemovingPlayer}
					key={player.id}
					player={player}
					toggleDeleteAction={handleDeleteAction}
				/>
			))}
		</FavoritePlayersStack>
	);
};

const FavoritePlayerItem = ({
	player,
	isRemovingPlayer,
	toggleDeleteAction,
}: {
	player: FavoritePlayer;
	isRemovingPlayer: boolean;
	toggleDeleteAction: (player: FavoritePlayer) => void;
}) => {
	return (
		<FavoritePlayerCard>
			<Box
				display='flex'
				alignItems={"center"}
				justifyContent={"center"}
				flexDirection={{ xs: "column", sm: "row" }}
				gap={2}
			>
				<SportsBasketballTwoToneIcon sx={{ color: "#778da9", fontSize: "3em" }} />
				<Box display='flex' flexDirection={"column"} gap={1}>
					<Box display='flex' gap={4} alignItems={"center"}>
						<Typography gutterBottom variant='body1' component='div'>
							{player.first_name} {player.last_name}
						</Typography>
						<Typography gutterBottom variant='body1' component='div' color='textSecondary'>
							#{player.jersey_number}
						</Typography>
						<Typography gutterBottom variant='body1' component='div' color='textSecondary'>
							{player.position}
						</Typography>
						<Typography gutterBottom variant='body1' component='div' color='textSecondary'>
							{player.team.full_name}
						</Typography>
					</Box>
					<StatsDataGrid stats={player?.stats} />
				</Box>
			</Box>
			<Box display='flex' alignItems={"center"} justifyContent={"center"}>
				<Tooltip title='Remove Player'>
					<IconButton color='primary' disabled={isRemovingPlayer} onClick={() => toggleDeleteAction(player)}>
						{isRemovingPlayer && <CircularProgress sx={{ m: 1 }} size='10px' />}
						<PersonRemoveIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</FavoritePlayerCard>
	);
};

const StatsDataGrid = ({ stats }: { stats: PlayerStats | undefined }) => {
	if (!stats) {
		return (
			<Typography variant='body2' color='textDisabled'>
				No stats available for the current season
			</Typography>
		);
	}
	return (
		<Box display={"flex"} gap={2}>
			<Stat>
				<Typography variant='button' fontSize={8} letterSpacing={1}>
					Points
				</Typography>
				{stats.pts}
			</Stat>
			<Stat>
				<Typography variant='button' fontSize={8} letterSpacing={1}>
					Rebounds
				</Typography>
				{stats.reb}
			</Stat>
			<Stat>
				<Typography variant='button' fontSize={8} letterSpacing={1}>
					Assists
				</Typography>
				{stats.ast}
			</Stat>
			<Stat>
				<Typography variant='button' fontSize={8} letterSpacing={1}>
					Steals
				</Typography>
				{stats.stl}
			</Stat>
			<Stat>
				<Typography variant='button' fontSize={8} letterSpacing={1}>
					Blocks
				</Typography>
				{stats.blk}
			</Stat>
			<Stat>
				<Typography variant='button' fontSize={8} letterSpacing={1}>
					Turnovers
				</Typography>
				{stats.turnover}
			</Stat>
			<Stat>
				<Typography variant='button' fontSize={8} letterSpacing={1}>
					Minutes
				</Typography>
				{stats.min}
			</Stat>
			<Stat>
				<Typography variant='button' fontSize={8} letterSpacing={1}>
					Games
				</Typography>
				{stats.games_played}
			</Stat>
		</Box>
	);
};

const FavoritePlayerCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
	"@media (max-width: 1080px)": {
		overflowX: "auto",
		flexDirection: "column",
	},
}));

const Stat = styled(Box)(({ theme }) => ({
	...theme.typography.caption,
	display: "flex",
	flexDirection: "column",
	color: theme.palette.text.secondary,
}));

const FavoritePlayersStack = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
	marginBottom: theme.spacing(2),
	width: "100%",
	height: "100%",
	overflowY: "auto",
	overflowX: "hidden",
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
}));
