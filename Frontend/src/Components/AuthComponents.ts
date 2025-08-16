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
    localStorage.removeItem("id");
    return false;
}

/* Validates if the string is a valid email string */
export const validateEmail = (email: string): boolean => {
    /* Uses Regex to check theres valid letters infront of the @ then valid letters behind it in front of the . and then checks letters behind the . */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* Checks if a user exists by using their given email */
// Change to return string use string compare check username then if not taken check email given
export const checkExisting = async (emailGiven: string): Promise<boolean> => {
    try {
        /* Attempts to get user by email given, if found return error */
        const response = await fetch('http://localhost:5000/users/email/' + emailGiven, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        /* If response is ok then a user exists and we dont want that for register */
        if (response.ok) {
            console.log(response);
            throw new Error(`Email has an existing User`);
        }
        return false;
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
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
        /* Sends a post request to login with given fields in json body */
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

        /* Set cookies */
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
        /* Sends a post request to register a user with given values */
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
        console.log(response);
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
    /* Sets username and id in localstorage for easy grabbing instead of getting from api */
    localStorage.setItem("username", data.username);
    localStorage.setItem("id", data._id);
}

/* Signs out the user */
export const signout = (navigate: NavigateFunction): void => {
    /* Clears out the cookie */
    document.cookie = "LOGIN-AUTH=; path=/; Secure; SameSite=Strict; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    /* Clears stored username and id */
    localStorage.removeItem("username");
    localStorage.removeItem("id");

    /* Redirect user */
    handleRedirect(navigate);
    /* Force page refresh to properly show content that aren't available to not logged in users */
    window.location.reload();
};

/* Redirects the user to the previous page */
export function handleRedirect(navigate: NavigateFunction) {
    /* Get previous page url from localstorage or set to home url */
    let previousPage: string = localStorage.getItem("previousPage") ?? "/";
    /* If in pages that require an account to access instead redirect to home */
    if (previousPage === "/about") {
        previousPage = "/";
    }
    console.log(previousPage);
    if (previousPage === "/news/") {
        navigate(previousPage, { replace: false });
    } else {
        navigate(previousPage, { replace: true });
    }
}

/* Checks if the user logged in is admin */
export const isAdmin = async (): Promise<boolean> => {
    try {
        const id = localStorage.getItem('id');
        /* If Login auth does not exist */
        if (!id) {
            return false
        }

        /* Sends request to get the user via id */
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        const role = data.role;

        if (role != undefined) {
            console.log("IS ADMIN");
            return true;
        } else {
            console.log("IS NOT ADMIN");
            return false
        }
    } catch (error) {
        console.error("Admin check error:", error instanceof Error ? error.message : "Unknown error");
        return false;
    }
};

export const isOwner = async (checkUser: string): Promise<boolean> => {
    try {

        const cookieName = 'LOGIN-AUTH'; // cookie name
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${cookieName}=`);
        const id = localStorage.getItem('id');
        const username = localStorage.getItem('username');

        console.log(id);
        console.log(parts[1]);

        const response = await fetch(`http://localhost:5000/users/session/${parts[1]}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if (response) {
            const data = await response.json();
            if (data._id == id && username == data.username && data.username == checkUser)   {
                console.log("found");
                return true;
            }
            return false;
        }

        /* Cookie not found, user is not logged in */
        localStorage.removeItem("username");
        localStorage.removeItem("id");

        /* If Login auth does not exist */
        return false

    } catch (error) {
        console.error("Error with checking if is owner of account");
        return false;
    }
};