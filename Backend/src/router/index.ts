import express from 'express';
import authentication from './authentication';
import users from './users';
import news from './news';

const router = express.Router ();

/* Creates the subpaths */
export default (): express.Router => {
    authentication(router);
    users(router);
    news(router);
    return router;
}