import type { Metadata } from "next";
import { Inclusive_Sans } from "next/font/google";
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { StreamVideoProvider } from "./providers/StreamVideoProvider";

const inter = Inclusive_Sans({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
	title: "FaceTime",
	description: "A video conferencing app for everyone",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
	
		<ClerkProvider>
				<html lang='en'>
				<body className={inter.className}>
					<StreamVideoProvider>
						<nav className='w-full py-4 md:px-8 px-4 text-center flex items-center justify-between sticky top-0 bg-white '>
							<div className='flex items-center justify-end gap-5'>
								{/*-- if user is signed out --*/}
								<SignedOut>
									<SignInButton mode='modal' />
								</SignedOut>
								{/*-- if user is signed in --*/}
								<SignedIn>
									<UserButton />
								</SignedIn>
							</div>
						</nav>
						
						{children}
						</StreamVideoProvider>
					</body>
				
		
			</html>
		</ClerkProvider>
		
	);
}