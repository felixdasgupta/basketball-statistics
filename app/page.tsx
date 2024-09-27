import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import SportsBasketballRoundedIcon from "@mui/icons-material/SportsBasketballRounded";
import App from "./app";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<main>
			<AppBar position='static' color='primary' enableColorOnDark>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						<Typography
							variant='h6'
							noWrap
							component='a'
							href='/'
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".1rem",
								color: "inherit",
								textDecoration: "none",
								alignItems: "center",
							}}
						>
							<SportsBasketballRoundedIcon sx={{ mr: "8px" }} />
							BALLERS
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
			<App />
		</main>
	);
}
