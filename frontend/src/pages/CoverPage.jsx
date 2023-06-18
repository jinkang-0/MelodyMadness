import { useState } from "react";
import ActionButton from "../components/ActionButton";
import Loading from "../components/Loading";
import SlideUpBox from "../components/SlideUpBox";

export default function CoverPage() {

    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [hasSubmitted, setSubmitted] = useState(false);
    const [isLoading, setLoading] = useState(false);

    // handle file upload
    function handleUpload(e) {
        const file = e.target.files[0];
        setFileName(file.name);
        setFile(file);
    }

    // handle submit request
    function handleSubmit() {
        console.log(file);
        setSubmitted(true);
        setLoading(true);
    }

    return (
        <main className="flex flex-col items-center h-full">
            <div className="flex flex-col items-start mt-16 w-1/3">
                <p>Upload a song sample for a suggested song cover!</p>
                <div className="bg-inputGray rounded-md w-full p-2 mt-2 relative flex gap-2 items-center">
                    <ActionButton className="bg-black" text="Upload" />
                    <p>{fileName}</p>
                    <input className="absolute top-0 left-0 h-full w-full opacity-0" type="file" onChange={handleUpload} />
                </div>
                <ActionButton text="Submit" className="bg-twitterBlue mx-auto mt-4" onClick={handleSubmit} />
            </div>
            {(hasSubmitted) && (
                (isLoading) ?
                    <Loading />
                    :
                    <SlideUpBox className="w-2/5 mt-16">
                        <div className="w-4/5 h-1 mx-auto border-t border-t-lightGray"></div>
                        <div className="w-full aspect-square my-16">
                            <img className="w-full h-full aspect-square" src={`url(${image})`} alt="generated_image" />
                        </div>
                    </SlideUpBox>
            )}
        </main>
    );
}
