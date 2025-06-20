import { RequestHandler, Request, Response, NextFunction } from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

/* Checks if the request comes from a valid User */
export const isAuthenticated: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* Session token found by checking for the LOGIN-AUTH cookie */
        const sessionToken: string = req.cookies['LOGIN-AUTH'];
        /* Gets user with the found session token */
        const existingUser = await getUserBySessionToken(sessionToken);

        /* If a session token or existing user is not found then send an error and stop */
        if (!sessionToken || !existingUser) {
            res.sendStatus(403);
            return;
            /* Else merge user identifier with the request */
        } else {
            merge(req, { identity: existingUser });
            next();
        }
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

/* Check if the request that's changing a user, comes from the actual user themself */
export const isOwner: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /* Get id from params in the request  */
        const { id } = req.params;
        /* Gets the current user id from the identity part of the request as specified in isAuthenticated*/
        const currentUserId: string = get(req, 'identity._id') as unknown as string

        /* If current user id is not found in the request return an error */
        if (!currentUserId) {
            res.sendStatus(403);
            return;
        }

        /* If the current user id does not equal the id given by the request return an error */
        if (currentUserId.toString() != id) {
            res.sendStatus(403);
            return;
        }

        next();
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}