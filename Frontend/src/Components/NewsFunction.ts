import { News} from './Interfaces'

/* Gets all news from the api */
export const getNews = async (): Promise<News[]> => {
    try {
        /* Gets all the news from api */
        const response = await fetch('http://localhost:5000/news/', {
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
        const empty: News[] = [];
        return empty;
    }
}

/* Gets a single news json using its id */
export const getSingleNews = async (id: string): Promise<News> => {
    try {
        /* Gets news with the given id */
        const response = await fetch('http://localhost:5000/news/' + id, {
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
            console.error("Could not find News with this id");
        } else {
            console.error("An unknown error occurred.");
        }
        const empty: News = {
            _id: "",
            title: "",
            desc: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return empty;
    }
}

/* Edits a news item in api with the given id */
export const editNews = async (newTitle: string, newDesc: string, id: string): Promise<void> => {
    try {
        /* Sends a PATCH request to api with given id */
        const response = await fetch('http://localhost:5000/news/' + id, {
            method: 'PATCH',
            body: JSON.stringify({
                title: newTitle,
                desc: newDesc,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();
        /* Catch errors and log the error */
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error editing News");
        } else {
            console.error("An unknown error occurred.");
        }
    }
}