import React from "react";

export default function AudioPlayer({ audioFile }) {
    return (
        <audio controls={true}>
            <source src={audioFile} />
        </audio>
    );
}
