import express from 'express';
import { getAllRecipes, createRecipe, getSingleRecipe, deleteRecipe, updateRecipe } from '../../src/controllers/recipes';
import { addCommentToRecipe, deleteCommentsByRecipe } from '../controllers/comments';

/* Sub routes relating to Recipes */
export default (router: express.Router) => {
    router.get('/recipe', getAllRecipes);
    router.get('/recipe/:id', getSingleRecipe);
    router.post('/recipe', createRecipe);
    router.delete('/recipe/:id', deleteRecipe);
    router.patch('/recipe/:id', updateRecipe);
    
    /* Comment related Routes*/
    router.post('/recipe/:id/comment', addCommentToRecipe);
    router.delete('/recipe/:id/comment', deleteCommentsByRecipe);
}