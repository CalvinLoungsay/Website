import { NavigateFunction } from "react-router";

/* Checks if User is logged in */
export const checkLogin = (): boolean => {
    const cookieName = 'LOGIN-AUTH'; // cookie name
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);

    if (parts.length === 2) {
        /* Cookie found, user is logged in */
        return true;
    }

    /* Cookie not found, user is not logged in */
    localStorage.removeItem("username");
    return false;
}

/* Validates if the string is a valid email string */
export const validateEmail = (email: string): boolean => {
    //Uses Regex to check theres valid letters infront of the @ then valid letters behind it in front of the . and then checks letters behind the .
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* Checks if a user exists by using their given email */
export const checkExisting = async (emailGiven: string): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:5000/users/' + emailGiven, {
            method: 'POST',
            body: JSON.stringify({
                email: emailGiven
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        /* If response is ok then a user exists and we dont want that for register */
        if (response.ok) {
            throw new Error(`Email has an existing User`);
        }
        return false;
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.error("Email has an existing User");
        } else {
            console.error("An unknown error occurred.");
        }
        return true;
    }
}

/* Logs the user in with the given email and password */
export const loginUser = async (loginEmail: string, loginPassword: string): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        /* If response is not ok then return an error */
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        /* Wait for the api to send back a response json to use to set up cookies */
        const data = await response.json();

        setUserCookie(data);
        return true;
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.error("Login failed:", error.message);
        } else {
            console.error("An unknown error occurred.");
        }
        return false;
    }
};

/* Registers a user with given email, password, and username */
export const registerUser = async (regEmail: string, regPassword: string, regName: string): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: regEmail,
                password: regPassword,
                username: regName,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        /* If reponse is not ok then return an error */
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }

        /* Checks if we're able to login to the new user */
        const loggedIn = await loginUser(regEmail, regPassword);

        /* If true then we've logged in and register worked */
        if (loggedIn) {
            return true;
            /* Else something went wrong with the register or login */
        } else {
            console.log("Logging in after register failed")
            return false
        }
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.error("Register failed:", error.message);
        } else {
            console.error("An unknown error occurred.");
        }
        return false;
    }
}


/* Sets user's cookie data to be used for other parts of the website */
function setUserCookie(data: { _id: string, username: string, email: string, authentication: { sessionToken: string } }) {
    /* Gets current date */
    const expirationDate = new Date();
    /* Sets expiration date to be the current date + a week */
    expirationDate.setTime(expirationDate.getTime() + 604800);

    /* Sets users session token in login-auth cookie with expiration date of 1 week */
    document.cookie = `LOGIN-AUTH=${data.authentication.sessionToken}; path=/; Secure; SameSite=Strict; max-age=${expirationDate.toUTCString()}`;
    /* Sets username in localstorage for easy grabbing instead of getting from api */
    localStorage.setItem("username", data.username);
}

/* Signs out the user */
export const signout = (navigate: NavigateFunction): void => {
    /* Clears out the cookie */
    document.cookie = "LOGIN-AUTH=; path=/; Secure; SameSite=Strict; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    /* Clears stored username */
    localStorage.removeItem("username");

    /* Redirect user */
    handleRedirect(navigate);
};

/* Redirects the user to the previous page */
export function handleRedirect(navigate: NavigateFunction) {
    /* Get previous page url from localstorage or set to '/' */
    let previousPage: string = localStorage.getItem("previousPage") ?? "/";
    /* If in pages that require an account to access instead redirect to home */
    if (previousPage === "/about") {
        previousPage = "/";
    }
    navigate(previousPage);
}