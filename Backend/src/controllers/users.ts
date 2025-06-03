import express, { RequestHandler, Request, Response } from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/users';

/* Gets all user from the database */
export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();

        res.status(200).json(users);
    /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

/* Deletes user in the database */
export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Gets id from request params */
        const { id } = req.params;

        /* Deletes user by id */
        const deletedUser = await deleteUserById(id);

        res.json(deletedUser);
        return;
    /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

/* Updates user in the database */
export const updateUser = async (req: Request, res: Response) => {
    try {
        /* Gets id from request params */
        const { id } = req.params;
        const user = await getUserById(id);
        /* Gets username they want to change to from the json body */
        const { username } = req.body;

        /* If username or user does not exist return an error */
        if (!username || !user) {
            res.sendStatus(400);
            return;
        }
        /* Sets user's name to given name in the json body */
        user.username = username;
        await user.save();
        res.status(200).json(user);
        return;
    /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}