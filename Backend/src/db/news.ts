import mongoose from 'mongoose';

/* News schema */
const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
}, { timestamps: true });

/* Creates News model with the News schema */
export const NewsModel = mongoose.model('News', NewsSchema);

/* Gets all news in the db */
export const getNews = () => NewsModel.find();
/* Gets news by using id */
export const getNewsById = (id: string) => NewsModel.findById(id);
/* Creates a news in the database based on News Model */
export const createNews = (values: Record<string, any>) => new NewsModel(values).save().then((news) => news.toObject());
/* Deletes news by id */
export const deleteNewsById = (id: string) => NewsModel.findOneAndDelete({ _id: id });
/* Updates news by id */
export const updateNewsById = (id: string, values: Record<string, any>) => NewsModel.findByIdAndUpdate(id, values);
