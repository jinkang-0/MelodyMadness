import ArtistSelect from "../components/ArtistSelect";
import ActionButton from "../components/ActionButton";
import Loading from "../components/Loading";
import SlideUpBox from "../components/SlideUpBox";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

export default function LyricsPage() {

    // const artists = ['Drake', 'JayZ', 'Miley Cyrus', 'Eminem'];
    const [artists, setArtists] = useState([]);
    const [hasSubmitted, setSubmitted] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [lyrics, setLyrics] = useState("");
    var selectedArtist = "";

    useEffect(() => {
        (async () => {
            await fetch('/api/artists', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                const artistList = data.artists;
                setArtists(artistList);
            })
        })();
    }, []);

    // update selected artist
    function handleSelect(value) {
        selectedArtist = value;
    }

    // handle submit request
    async function handleSubmit() {
        if (selectedArtist === '')
            return;

        setSubmitted(true);
        setLoading(true);

        await fetch('/api/lyrics', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ artist: selectedArtist })
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            const lyrics = data.lyrics;
            setLoading(false);
            setSubmitted(true);
            setLyrics(lyrics);
        })
    }

    return (
        <main className="flex flex-col items-center h-full">
            <div className="flex flex-col items-start mt-16 w-1/3">
                <p className="mb-2">Generate lyrics in the style of an artist!</p>
                <ArtistSelect artists={artists} value={selectedArtist} onChange={e => handleSelect(e.target.value)} />
                <ActionButton text="Submit" className="bg-twitterBlue mx-auto mt-4" onClick={handleSubmit} />
            </div>
            {(hasSubmitted) && (
                (isLoading) ?
                    <Loading />
                    :
                    <SlideUpBox className="w-2/5 my-16">
                        <div className="w-4/5 h-1 mx-auto border-t border-t-lightGray"></div>
                        <p className="mt-8 mb-2">Generated lyrics!</p>
                        <div className="bg-inputGray rounded-md p-4">
                            {lyrics.trim().split('\n').map(line => (
                                <p key={uuidv4()}>
                                    {line} <br />
                                </p>
                            ))}
                        </div>
                    </SlideUpBox>
            )}
        </main>
    );
}
