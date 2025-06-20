import { RequestHandler, Request, Response } from 'express';
import { deleteNewsById, getNewsById, getNews, createNews } from '../db/news';

/* Gets all news from the database */
export const getAllNews: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Get all news from the api */
        const news = await getNews();
        res.status(200).json(news);
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

/* Gets single news from the database using id */
export const getSingleNews: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Get id from request parameters */
        const { id } = req.params;
        /* Get single news from database using id from params  */
        const news = await getNewsById(id);

        res.status(200).json(news);
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

/* Create new News entries in the database */
export const createNewNews: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Gets title and description from the request body */
        const { title, desc } = req.body;
        /* Send post request to the api */
        const news = await createNews({
            title,
            desc,
        });

        res.status(200).json(news);
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

/* Deletes news from the database */
export const deleteNews: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Gets id from request params */
        const { id } = req.params;

        /* Send delete request using id in params */
        const deletedNews = await deleteNewsById(id);

        res.json(deletedNews);
        return;
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

/* Updates news in the database */
export const updateNews: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Gets id from request params */
        const { id } = req.params;
        /* Send patch request using id given in params */
        const news = await getNewsById(id);
        /* Gets title and desc they want to change to from the json body */
        const { title, desc } = req.body;

        /* If title and desc, or the news does not exist return an error */
        if (!news || !desc && !title) {
            res.sendStatus(400);
            return;
        }

        /* Sets news's title and description */
        news.desc = desc;
        news.title = title;
        /* Wait for the news to save */
        await news.save();
        res.status(200).json(news);
        return;
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}