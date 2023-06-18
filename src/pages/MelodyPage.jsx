import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendButton from "../components/SendButton";
import Loading from "../components/Loading";
import AudioPlayer from "../components/AudioPlayer";
import axios from "axios";

export default function MelodyPage() {

    var prompt = '';
    const [isWaiting, setWaiting] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [audioFile, setAudioFile] = useState('');
    const navigate = useNavigate();

    // handle text input
    function handleInput(e) {
        prompt = e.target.value;
    }

    // handle submit request
    function handleSubmit() {
        if (prompt === '')
            return;

        setWaiting(true);
        setLoading(true);

        axios
            .post('/melody', { prompt: prompt })
            .then(res => {
                const data = res.data;
                if (!data)
                    navigate('/error');
                
                setAudioFile(data.audioFile);
                setWaiting(false);
                setLoading(false);
            })
            .catch(err => {
                console.log("Error:", err);
                navigate('/error');
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
            {(isWaiting) && (
                (isLoading) ?
                    <Loading />
                    :
                    <div className="h-full flex flex-col mt-16 w-1/3">
                        <p className="text-start mb-2">Generated melodies!</p>
                        <AudioPlayer audioFile={audioFile} />
                    </div>
            )}
        </main>
    );
}
