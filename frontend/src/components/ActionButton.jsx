import React from "react";

export default function ActionButton({ text, onClick, className }) {
    return (
        <button className={`${className} outline-none rounded-sm p-1 px-2`} onClick={onClick}>
            {text}
        </button>
    );
}
