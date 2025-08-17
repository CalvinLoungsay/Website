import type { Recipe } from "./Interfaces";

/* Gets all recipes from the api */
export const getRecipes = async (): Promise<Recipe[]> => {
    try {
        /* Gets all the recipes from api */
        const response = await fetch('https://website-4dw5.onrender.com/recipe', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();
        return data
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.error("Could not get News");
        } else {
            console.error("An unknown error occurred.");
        }
        const empty: Recipe[] = [];
        return empty;
    }
}

export const createRecipe = async (title: string, author:string, imgData:string,cookTime: string, desc: string, ingredients: string[], servings: number, nutrition: { label: string; value: string | number }[]
    , steps: string[]): Promise<Boolean> => {
    try {
        /* Creates a recipe */
        const response = await fetch('https://website-4dw5.onrender.com/recipe/', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                author: author,
                imageData: imgData,
                description: desc,
                cookTime: cookTime,
                ingredients: ingredients,
                servings: servings,
                nutrition: nutrition,
                steps: steps,
                comments: []
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();
        console.log(data);
        return true
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.error("Could not create Recipe");
        } else {
            console.error("An unknown error occurred.");
        }
        return false;
    }
}

export const editRecipe = async (title: string, author:string, imgData:string,cookTime: string, desc: string, ingredients: string[], servings: number, nutrition: { label: string; value: string | number }[]
    , steps: string[], _id:string): Promise<Boolean> => {
    try {
        /* Edits a recipe from the api */
        const response = await fetch('https://website-4dw5.onrender.com/recipe/' + _id, {
            method: 'PATCH',
            body: JSON.stringify({
                title: title,
                author: author,
                imageData: imgData,
                description: desc,
                cookTime: cookTime,
                ingredients: ingredients,
                servings: servings,
                nutrition: nutrition,
                steps: steps
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();
        console.log(data);
        return true
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.error("Could not edit recipe");
        } else {
            console.error("An unknown error occurred.");
        }
        return false;
    }
}

export const deleteRecipe = async (id: string): Promise<Boolean> => {
    try {
        /* Delete recipe from api */
        const response = await fetch('https://website-4dw5.onrender.com/recipe/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();
        console.log(data);
        return true
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.error("Could not delete Recipe");
        } else {
            console.error("An unknown error occurred.");
        }
        return false;
    }
}