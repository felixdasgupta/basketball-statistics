import { Player } from "@/utils/types";
import { Paper, Stack, CircularProgress, Box, Button, Chip, Typography, Alert } from "@mui/material";
import { useRef } from "react";
import { styled } from "@mui/material/styles";
import { usePlayerContext } from "@/store/PlayersContext";
import DiscFullTwoToneIcon from "@mui/icons-material/DiscFullTwoTone";

interface PlayersResultsProps {
	players: Player[];
	isLoading: boolean;
	loadMorePlayers: () => void;
}

export const PlayersResults = ({ players, isLoading, loadMorePlayers }: PlayersResultsProps) => {
	const playerRef = useRef<HTMLDivElement>(null);

	const { players: addedPlayers, addNewPlayer, isAddingPlayer, addingPlayerError } = usePlayerContext();
	const playerIdSet = new Set(addedPlayers.map((player) => player.id));

	if (!players.length) {
		return null;
	}

	const handleScroll = () => {
		// Infinite Scroll > Sometimes cause weird warning error in bundle
		if (!playerRef.current) return;
		const container = playerRef?.current;
		const { scrollTop, scrollHeight, clientHeight } = container;
		if (scrollTop + clientHeight >= scrollHeight - 100) {
			loadMorePlayers();
		}
	};

	const handleAddPlayer = (player: Player) => {
		addNewPlayer(player);
	};

	return (
		<PlayersResultsContainer ref={playerRef} onScroll={handleScroll}>
			{addingPlayerError && (
				<Alert sx={{ my: 2 }} severity='error'>
					{addingPlayerError.message}
				</Alert>
			)}
			<Stack>
				{players.map((player) => (
					<PlayerResult
						added={playerIdSet.has(player.id)}
						countExceed={addedPlayers.length === 15}
						isAddingPlayer={isAddingPlayer}
						key={player.id}
						player={player}
						addAction={handleAddPlayer}
					/>
				))}
				{isLoading && (
					<PlayerItem sx={{ justifyContent: "center" }} elevation={0}>
						<CircularProgress size='15px' />
					</PlayerItem>
				)}
			</Stack>
		</PlayersResultsContainer>
	);
};

const PlayersResultsContainer = styled(Box)(
	({ theme }) => `
  height: calc(100% - 78px);
  overflow-y: auto;
  padding: ${theme.spacing(1)} 0;
  margin: ${theme.spacing(1)} 0;
  background-color: transparent;
`
);

const PlayerItem = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.common.white,
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
	margin: theme.spacing(1),
	...theme.applyStyles("dark", {
		backgroundColor: "#1A2027",
	}),
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
}));

const PlayerResult = ({
	added,
	countExceed,
	isAddingPlayer,
	player,
	addAction,
}: {
	added: boolean;
	countExceed: boolean;
	isAddingPlayer: boolean;
	player: Player;
	addAction: (player: Player) => void;
}) => {
	return (
		<PlayerItem>
			<Box display={"flex"} alignItems='center' gap={1}>
				<Typography variant='subtitle1'>
					{player.first_name} {player.last_name}
				</Typography>
				<Typography variant='body2'>{player.team.abbreviation}</Typography>
			</Box>
			{countExceed ? (
				<Chip size='small' icon={<DiscFullTwoToneIcon />} label='Roster Full' variant='outlined' />
			) : (
				<Button
					disabled={added || isAddingPlayer}
					size='small'
					variant='contained'
					color='primary'
					onClick={() => addAction(player)}
				>
					{isAddingPlayer ? <CircularProgress sx={{ m: 1 }} size='10px' /> : added ? "Added" : "Add"}
				</Button>
			)}
		</PlayerItem>
	);
};
