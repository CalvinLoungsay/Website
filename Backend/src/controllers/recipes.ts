import { RequestHandler, Request, Response } from 'express';
import { getComments, getCommentById, createComment, deleteCommentById, updateCommentById, deleteAllCommentsFromRecipe } from '../db/comments';
import { getRecipes, getRecipeById, createRecipes, deleteRecipeById, updateRecipeById, RecipeModel } from '../db/recipes';

export const getAllRecipes: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Get all recipes from the api */
        const recipes = await getRecipes();
        res.status(200).json(recipes);
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}


/* Create new Recipe entries in the database */
export const createRecipe: RequestHandler = async (req: Request, res: Response) => {
    try {
        /* Gets recipe details from request body*/
        const { title, author, cookTime, imageData, description, ingredients, servings, nutrition, steps, comments } = req.body;
        /* Send post request to the api */
        const recipe = await createRecipes({
            title,
            author,
            cookTime,
            imageData,
            description,
            ingredients,
            servings,
            nutrition,
            steps,
            comments
        });

        res.status(200).json(recipe);
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

export const getSingleRecipe: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const recipe = await getRecipeById(id);

        res.status(200).json(recipe);
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

export const deleteRecipe: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const response = await deleteRecipeById(id);

        const commentResponse = await deleteAllCommentsFromRecipe(id);
        res.status(200).json(response);
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}

export const updateRecipe: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const recipe = await getRecipeById(id);

        if (!recipe) {
            res.sendStatus(400);
            return;
        }

        const { title, author, cookTime, imageData, description, ingredients, servings, nutrition, steps} = req.body;

        recipe.title = title;
        recipe.author = author;
        recipe.cookTime = cookTime;
        recipe.imageData = imageData;
        recipe.description = description;
        recipe.ingredients = ingredients;
        recipe.servings = servings;
        recipe.nutrition = nutrition;
        recipe.steps = steps;
        /* Send post request to the api */
        await recipe.save();
        res.status(200).json(recipe);
        return;
        /* Catch errors and log the error */
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return;
    }
}