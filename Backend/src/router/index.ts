import express from 'express';
import authentication from './authentication';
import users from './users';
import news from './news';
import recipes from './recipes'

const router = express.Router ();

/* Creates the subpaths */
export default (): express.Router => {
    authentication(router);
    users(router);
    news(router);
    recipes(router);
    return router;
}