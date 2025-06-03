import mongoose from  'mongoose';

/* User schema */
const UserSchema =  new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: {type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false},
    }
});
/* Creates user model with the user schema */
export const UserModel = mongoose.model('User',UserSchema);

/* Gets all users in the user */
export const getUsers = () => UserModel.find();
/* Gets user by using email */
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
/* Gets user by session token for use in verifying owner is sending the request */
export const getUserBySessionToken  = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
/* Gets user by id */
export const getUserById = (id: string) => UserModel.findById(id);
/* Creates a user in the database based on User Model */
export const createUser =   (values: Record<string, any>)  =>  new UserModel(values).save().then((user) => user.toObject());
/* Deletes user by id */
export const deleteUserById  = (id: string) => UserModel.findOneAndDelete({ _id: id});
/* Updates user by id */
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
