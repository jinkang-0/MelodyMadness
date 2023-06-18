import React from "react";

export default function NotFound() {
    return (
        <main className="grid grid-cols-2">
            <div className="ml-32 mt-32">
                <h1 className="text-7xl mb-4">
                    Error 404: <br /> Not Found
                </h1>
                <p className="text-lg">
                    Sorry, but your data is in another castle :(
                </p>
            </div>
        </main>
    );
}
