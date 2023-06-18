import React from "react";
import LinkButton from "../components/LinkButton";

export default function MainPage() {
    return (
        <main className="grid grid-cols-2 h-full">
            <div className="flex flex-col pt-32 pl-32">
                <h1 className="text-7xl font-medium mb-4">
                    Melody
                    <br />
                    Madness
                </h1>
                <p className="text-lg mb-4">A short melody generator for the busybody.</p>
                <LinkButton text="Try it out" link="melody" className="bg-black" />
                <span className="mt-2 text-darkGray text-xs w-2/3">
                    * Access is only available in the duration of the Berkeley
                    AI Hackathon hosted in 2023. Pricing will be adjusted after
                    June 18th, 2023.
                </span>
            </div>
            <div className="h-full" style={{ backgroundImage: 'url("/unsplash_image.png")', clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', backgroundPosition: '50% 50%' }}>
            </div>
        </main>
    );
}
