import { useState } from "react";
import SendButton from "../components/SendButton";
import Loading from "../components/Loading";

export default function MelodyPage() {

    var prompt = '';
    const [hasSubmitted, setSubmitted] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [audioFile, setAudioFile] = useState('');

    // handle text input
    function handleInput(e) {
        prompt = e.target.value;
    }

    // handle submit request
    async function handleSubmit() {
        if (prompt === '')
            return;

        setSubmitted(true);
        setLoading(true);

        await fetch('/api/melody', {
            method: 'POST',
            credentials: 'same-origin',
            headers:{
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            const base64String = data.audioFile;
            const wavString = "data:audio/wav;base64," + base64String;
            setAudioFile(wavString);
            setLoading(false);
            setSubmitted(true);
            // const snd = new Audio(wavString);
            // snd.play(); 
        });
    }

    return (
        <main className="flex flex-col items-center h-full">
            <div className="flex flex-col items-start mt-16 w-1/3">
                <p>Write a prompt for a melody!</p>
                <div className="flex gap-2 mt-2 w-full">
                    <input className="w-full px-2 rounded-sm outline-none transition font-normal bg-inputGray placeholder:text-darkGray" type="text" placeholder="A happy melody with a twist at the end" onChange={handleInput}/>
                    <SendButton onClick={handleSubmit} />
                </div>
            </div>
            {(hasSubmitted) && (
                (isLoading) ?
                    <Loading />
                    :
                    <div className="h-full flex flex-col mt-16 w-1/3">
                        <p className="text-start mb-2">Generated melodies!</p>
                        <audio src={audioFile} controls={true}></audio>
                    </div>
            )}
        </main>
    );
}
