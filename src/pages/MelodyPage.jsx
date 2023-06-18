import React from "react";
import SendButton from "../components/SendButton";
import Loading from "../components/Loading";
import AudioPlayer from "../components/AudioPlayer";

export default function MelodyPage() {

    var isLoading = false;
    const audioFile = '/output.wav';

    return (
        <main className="flex flex-col items-center h-full">
            <div className="flex flex-col items-start mt-16 w-1/3">
                <p>Write a prompt for a melody!</p>
                <div className="flex gap-2 mt-2 w-full">
                    <input className="w-full px-2 rounded-sm outline-none transition font-normal bg-inputGray placeholder:text-darkGray" type="text" placeholder="A happy melody with a twist at the end" />
                    <SendButton />
                </div>
            </div>
            {(isLoading) ?
                <Loading />
                :
                <div className="h-full flex flex-col mt-16 w-1/3">
                    <p className="text-start mb-2">Generated melodies!</p>
                    <AudioPlayer audioFile={audioFile} />
                </div>
            }
        </main>
    );
}
