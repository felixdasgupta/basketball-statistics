export type PlayerStats = {
	player_id: number;
	pts: number;
	ast: number;
	turnover: number;
	pf: number;
	fga: number;
	fgm: number;
	fta: number;
	ftm: number;
	fg3a: number;
	fg3m: number;
	reb: number;
	oreb: number;
	dreb: number;
	stl: number;
	blk: number;
	fg_pct: number;
	fg3_pct: number;
	ft_pct: number;
	min: string;
	games_played: number;
	season: number;
};

export type Team = {
	id: number;
	full_name: string;
	name: string;
	abbreviation: string;
};

export type Player = {
	id: number;
	first_name: string;
	last_name: string;
	position: string;
	jersey_number: string;
	team: Team;
};

export type FavoritePlayer = Player & {
	stats?: PlayerStats;
};
