import express from 'express';
import { login, register } from '../controllers/authentication';

/* Sub routes relating to authorization */
export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
}