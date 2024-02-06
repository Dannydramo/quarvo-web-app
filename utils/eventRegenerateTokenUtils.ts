"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Axios } from "@/helpers/axioselpers";

export const EventTokenRegeneration = () => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const regenerateAuthToken = async () => {
            try {
                const currentToken = getCookie("jwtToken");
                const response = await Axios({
                    url: "/api/regenerate-token",
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                    },
                });

                if (response.status === 200) {
                    const newToken = response.data?.newToken;
                    setCookie("jwtToken", newToken);
                    setToken(newToken);
                } else {
                    console.error("Token regeneration failed.");
                }
            } catch (err) {
                console.error("Error during token regeneration:", err);
            }
        };

        const logoutUser = () => {
            deleteCookie("jwtToken");
            router.replace("/event-center-login");
        };

        // Set up interval for token regeneration (every 3 minutes)
        const tokenRegenerationInterval = setInterval(
            regenerateAuthToken,
            3 * 60 * 1000
        );

        // Set up timeout for user inactivity logout (5 minutes)
        let inactivityTimeout = setTimeout(logoutUser, 5 * 60 * 1000);

        const handleUserActivity = () => {
            clearTimeout(inactivityTimeout);
            // Reset the inactivity timeout
            inactivityTimeout = setTimeout(logoutUser, 5 * 60 * 1000);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                clearTimeout(inactivityTimeout);
                // Reset the inactivity timeout
            } else {
                inactivityTimeout = setTimeout(logoutUser, 5 * 60 * 1000);
            }
        };

        // Add event listeners for user activity
        document.addEventListener("mousemove", handleUserActivity);
        document.addEventListener("keydown", handleUserActivity);
        document.addEventListener("touchstart", handleUserActivity);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Clean up event listeners and intervals on component unmount
        return () => {
            clearInterval(tokenRegenerationInterval);
            clearTimeout(inactivityTimeout);
            document.removeEventListener("mousemove", handleUserActivity);
            document.removeEventListener("keydown", handleUserActivity);
            document.removeEventListener("touchstart", handleUserActivity);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [token]);
};
