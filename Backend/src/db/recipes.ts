import mongoose from 'mongoose';
import { CommentSchema } from './comments'

const RecipeSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    cookTime: { type: String, required: true },
    imageData: { type: String },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    servings: { type: Number, required: true },
    nutrition: [{
        label: { type: String, required: true },
        value: { type: String, required: true }
    }],
    steps: [{ type: String, required: true }],
    comments: [CommentSchema]
}, { timestamps: true });

/* Creates Recipe model with the Recipe schema and Comment Schema */
export const RecipeModel = mongoose.model('Recipe', RecipeSchema);

export const getRecipes = () => RecipeModel.find();

export const getRecipeById = (id: string) => RecipeModel.findById(id);

export const createRecipes = (values: Record<string, any>) => new RecipeModel(values).save().then((recipe) => recipe.toObject());

export const deleteRecipeById = (id: string) => RecipeModel.findOneAndDelete({ _id: id });

export const updateRecipeById = (id: string, values: Record<string, any>) => RecipeModel.findByIdAndUpdate(id, values);
