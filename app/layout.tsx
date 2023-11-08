import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderBar from "@/components/HeaderBar";

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
			<html lang="en">
				<head>
					<link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
				</head>
				<body>
					<HeaderBar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
