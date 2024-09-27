import "./globals.css";

import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import theme from "../theme";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata = {
	metadataBase: new URL("https://basketball-statistics.vercel.app/"),
	title: "Basketball Statistics",
	description: "Your dream roster of basketball players and their statistics.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</head>
			<body className={roboto.variable}>
				<CssBaseline enableColorScheme />
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
