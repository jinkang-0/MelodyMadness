import React from "react";

export default function AudioPlayer({ audioFile }) {
    return (
        <div>
            <audio controls={true}>
                <source src={audioFile} />
            </audio>
        </div>
    );
}
