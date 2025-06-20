import express from 'express';
import { getAllNews, deleteNews, updateNews, getSingleNews, createNewNews } from '../controllers/news';

/* Sub routes relating to News */
export default (router: express.Router) => {
    router.get('/news', getAllNews);
    router.get('/news/:id', getSingleNews);
    router.post('/news/create', createNewNews);
    router.delete('/news/:id', deleteNews);
    router.patch('/news/:id', updateNews);
}