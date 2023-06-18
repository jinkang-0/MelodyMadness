import ArtistSelect from "../components/ArtistSelect";
import ActionButton from "../components/ActionButton";
import Loading from "../components/Loading";
import SlideUpBox from "../components/SlideUpBox";
import { v4 as uuidv4 } from "uuid";

export default function LyricsPage() {

    const artists = ['Drake', 'JayZ', 'Miley Cyrus', 'Eminem'];
    var selectedArtist = "";
    var isLoading = false;
    const lyrics = `
        Lorem ipsum dolor sit amet consectetur.
        Amet quisque diam, sit.
        Interdum lobortis accumsan.
        
        Pulvinar gravida ac in auctor.
        Suspendisse, sed scelerisque.
        Donec lectus porttitor et.
        
        Cam eu in tristique nec.
        In sit gravida condimentum.
        Elementum.
    `;

    // update selected artist
    function handleSelect(value) {
        selectedArtist = value;
    }

    // handle submit request
    function handleSubmit() {
        if (selectedArtist === '')
            return;

        console.log(selectedArtist);
    }

    return (
        <main className="flex flex-col items-center h-full">
            <div className="flex flex-col items-start mt-16 w-1/3">
                <p>Write a prompt for a melody!</p>
                <ArtistSelect artists={artists} value={selectedArtist} onChange={e => handleSelect(e.target.value)} />
                <ActionButton text="Submit" className="bg-twitterBlue mx-auto mt-4" onClick={handleSubmit} />
            </div>
            {(isLoading) ?
                <Loading />
                :
                <SlideUpBox className="w-2/5 mt-16">
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
            }
        </main>
    );
}
