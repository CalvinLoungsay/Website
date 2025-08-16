import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

/* Logins user by creating login auth token that is checked when doing activities needing login */
export const login: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Gets email and password from the request json body */
        const { email, password } = req.body;
        /* If password or email is missing return an error */
        if (!email || !password) {
            res.sendStatus(400);
            return;
        }

        /* Gets user by given email and specifies authenication salt and password to be included */
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        /* If user or the user's authenication salt does not exist or null return an error */
        if (!user || !user.authentication?.salt) {
            res.sendStatus(400);
            return;
        }

        /* Expected hash using password given in req body and users salt */
        const expectedHash = authentication(user.authentication.salt, password);

        /* If the user's authentication password does not equal expected hash return error */
        if (user.authentication.password != expectedHash) {
            res.sendStatus(403);
            return;
        }

        /* Creates a salt */
        const salt = random();

        /* Sets authenication session token */
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        /* Waits for the user info to save */
        await user.save();

        /* Sets response cookie LOGIN-AUTH to users session token */
        res.cookie('LOGIN-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        res.status(200).json(user).end();

    /* Catch errors and log the error */
    } catch (error) {
        res.sendStatus(400);
    }
}

/* Registers a new user in the database */
export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        /* Sets email, password, and username to ones given in the request's body */
        const { email, password, username } = req.body;

        /* If email, password, or username are empty return an error */
        if (!email || !password || !username) {
            res.sendStatus(400);
            return;
        }

        /* Tries and gets an existing user by given email */
        const existingEmail = await getUserByEmail(email);
        /* If there is an existing user return an error */
        if (existingEmail) {
            res.sendStatus(400);
            return;
        }

        /* Creates salt */
        const salt = random();
        /* Creates a user in the database */
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        res.status(200).json(user);
    /* Catch errors and log the error */
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
