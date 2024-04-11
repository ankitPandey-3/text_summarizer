import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NotLoggedInHome } from "./NotLoggedInHome.jsx";
import { LoggedInHome } from "./LoggedInHome.jsx";
import { RotatingLines } from "react-loader-spinner";

export function Home({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay (you can adjust the delay time as needed)
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Cleanup function to clear the timeout if component unmounts or changes
        return () => clearTimeout(delay);
    }, []);

    function handleClick(e) {
        e.preventDefault();
        if (e.target.id === "signup") {
            navigate('/signup');
        }
        else if (e.target.id === 'login') {
            navigate('/login');
        }
    }

    return (
        <div>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <RotatingLines
                        visible={true}
                        height="96"
                        width="96"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                isLoggedIn ? <LoggedInHome setIsLoggedIn={setIsLoggedIn}/> : <NotLoggedInHome />
            )}
        </div>
    );
}
