import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser, getUserByToken, getUserWithId } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

/* Sub routes relating to users account */
export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/users/email/:email', getUser);
    router.get('/users/:id', isAuthenticated, getUserWithId);
    router.get('/users/session/:sessionToken', isAuthenticated, getUserByToken);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
}