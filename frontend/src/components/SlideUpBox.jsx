import React from "react";
import styles from "./styles/bar.module.css";

export default function SlideUpBox({ children, className }) {
    return (
        <div className={`${styles.bar} ${className}`}>
            {children}
        </div>
    );
}
