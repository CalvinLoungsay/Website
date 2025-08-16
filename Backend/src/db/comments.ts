import mongoose from "mongoose";

// 🍳 Comment Schema
export const CommentSchema = new mongoose.Schema({
    recipeId: {type: String, required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 }
}, { timestamps: true });

/* Creates Comment model with the Comment schema */
export const CommentModel = mongoose.model('Comment', CommentSchema);

export const getComments = (filter: {}) => CommentModel.find(filter);

export const getCommentById = (id: string) => CommentModel.findById(id);

export const createComment = (values: Record<string, any>) => new CommentModel(values).save().then((comment) => comment.toObject());

export const deleteCommentById = (id: string) => CommentModel.findOneAndDelete({ _id: id });

export const updateCommentById = (id: string, values: Record<string, any>) => CommentModel.findByIdAndUpdate(id, values);

export const deleteAllCommentsFromRecipe = (recipeId: string) => CommentModel.deleteMany({recipeId});