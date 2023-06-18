import React from "react";
import LogoIcon from "./icons/LogoIcon";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function NavBar() {

    const location = useLocation();
    const highlighted = "text-white";
    const unhighlighted = "text-lightGray hover:brightness-125 transition";

    const links = ['Melody', 'Lyrics', 'Cover'];

    return (
        <nav className="flex w-full bg-nav gap-4 items-center">
            <Link to="/" className="p-2 px-4">
                <LogoIcon className="w-8 aspect-square" />
            </Link>
            {links.map(l => (
                <Link 
                    key={uuidv4()} 
                    to={`/${l.toLowerCase()}`}
                    className={(location.pathname === `/${l.toLowerCase()}`) ? highlighted : unhighlighted}
                >
                    {l}
                </Link>
            ))}
        </nav>
    );
}
