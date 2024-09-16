"use client";
import { useGetCallById } from "@/app/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import {
	StreamCall,
	StreamTheme,
	PaginatedGridLayout,
	SpeakerLayout,
	CallControls
} from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import {  useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

export default function FaceTimePage() {
	const { id } = useParams<{ id: string }>();
	const { isLoaded } = useUser();
	const { call, isCallLoading } = useGetCallById(id);
	const [confirmJoin, setConfirmJoin] = useState<boolean>(false);
	const [camMicEnabled, setCamMicEnabled] = useState<boolean>(false);
	const router = useRouter();
	
	useEffect(() => {
		if (camMicEnabled) {
			call?.camera.enable();
			call?.microphone.enable();
		} else {
			call?.camera.disable();
			call?.microphone.disable();
		}

	}, [call, camMicEnabled]);

	const handleJoin = () => { 
		call?.join();
		setConfirmJoin(true)
	}

	if (isCallLoading || !isLoaded) return <p>Loading...</p>;

	if (!call) return (<p>Call not found</p>);

	return (
		<main className='min-h-screen w-full items-center justify-center'>
			<StreamCall call={call}>
			<StreamTheme>
				{confirmJoin ? <MeetingRoom /> : (
					<div className='flex flex-col items-center justify-center gap-5'>
							<h1 className='text-3xl font-bold'>Join Call</h1>
							<p className='text-lg'>Are you sure you want to join this call?</p>
							<div className='flex gap-5'>
								<button onClick={handleJoin} className='px-4 py-3 bg-green-600 text-green-50'>Join</button>
								<button onClick={() => router.push("/")} className='px-4 py-3 bg-red-600 text-red-50'>Cancel</button>
							</div>
						</div>
				)}
				</StreamTheme>
			</StreamCall>
		</main>
	);

}

const MeetingRoom = () => {
	const [layout, setLayout] = useState<CallLayoutType>("grid");
	const router = useRouter();

	const handleLeave = () => {
		confirm("Are you sure you want to leave the call?") && router.push("/");
	};

	const CallLayout = () => {
		switch (layout) {
			case "grid":
				return <PaginatedGridLayout />;
			case "speaker-right":
				return <SpeakerLayout participantsBarPosition='left' />;
			default:
				return <SpeakerLayout participantsBarPosition='right' />;
		}
	};

	return (
		<section className='relative min-h-screen w-full overflow-hidden pt-4'>
			<div className='relative flex size-full items-center justify-center'>
				<div className='flex size-full max-w-[1000px] items-center'>
					<CallLayout />
				</div>
				<div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
					<CallControls onLeave={handleLeave} />
				</div>
			</div>
		</section>
	);
};