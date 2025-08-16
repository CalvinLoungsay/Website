import { Request, Response, RequestHandler } from "express";
import { RecipeModel } from "../db/recipes";
import { createComment, deleteAllCommentsFromRecipe } from "../db/comments";

export const addCommentToRecipe: RequestHandler = async (req: Request, res: Response) => {
  try {
    const recipeId = req.params.id;
    const recipe = await RecipeModel.findById(recipeId);
    console.log("hi");
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    const { username, comment, rating } = req.body;
    const newComment = await createComment({ recipeId, username, comment, rating });

    recipe.comments.unshift(newComment);
    await recipe.save();

    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: "Error adding comment 2" });
  }
};

export const deleteCommentsByRecipe: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await deleteAllCommentsFromRecipe(id);
    res.status(201).json(response);

    return;
  } catch (err) {
    res.status(400).json({ message: "Error adding comment" });
  }
}