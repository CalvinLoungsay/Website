/* Recipe interface */
export interface Recipe {
    _id: number
    author: string
    title: string
    cookTime: string
    imageData?: string
    description: string
    ingredients: string[]
    servings: number
    nutrition: { label: string, value: string }[]
    createdAt: Date
    updatedAt: Date
    steps: string[]
    comments: Comment[]
}

/* News interface */
export interface News {
    _id: string,
    title: string,
    desc: string,
    createdAt: Date,
    updatedAt: Date
}

/* Comment interface */
export interface Comment {
    id: string
    username: string
    comment: string
    rating: number
    createdAt: Date
    updatedAt: Date
}