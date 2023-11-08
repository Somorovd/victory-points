import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
	title: "Victory Points",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<head>
					<link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
				</head>
				<body>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}
						storageKey="vp-theme"
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
