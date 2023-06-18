import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/loading.module.css";

export default function Loading({ className }) {
  return (
    <div className={`h-full flex flex-col justify-center ${className}`}>
        <FontAwesomeIcon className={`text-twitterBlue text-4xl mb-32 ${styles.loading}`} icon={faSpinner} />
    </div>
  )
}
