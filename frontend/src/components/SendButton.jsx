import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function SendButton({ className, onClick }) {
    return (
        <button className={`${className} bg-twitterBlue w-8 h-8 grid place-items-center rounded-sm hover:brightness-110 transition`} onClick={onClick}>
            <FontAwesomeIcon className="w-full m-auto" icon={faPaperPlane} />
        </button>
    );
}
