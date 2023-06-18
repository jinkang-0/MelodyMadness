import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles/select.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function ArtistSelect({ artists, onChange, value }) {
    return (
        <div className="bg-inputGray w-full relative rounded-sm">
            <select className={`bg-inputGray outline-none w-full p-1 px-2 rounded-sm ${styles.select}`} onChange={onChange} defaultValue={value}>
                <option value="" disabled hidden>Select artist</option>
                {artists.map((l) => (
                    <option key={uuidv4()} value={l}>
                        {l}
                    </option>
                ))}
            </select>
            <FontAwesomeIcon className="absolute right-0 top-0 m-2 mr-3" icon={faCaretDown} />
        </div>
    );
}
