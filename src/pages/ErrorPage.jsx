import React from "react";

export default function ErrorPage() {
    return (
        <main className="grid grid-cols-2">
            <div className="ml-32 mt-32">
                <h1 className="text-7xl mb-4">
                    Critical Error Occurred
                </h1>
                <p className="text-lg">
                    Whoops... Something just went wrong.
                </p>
            </div>
        </main>
    );
}
