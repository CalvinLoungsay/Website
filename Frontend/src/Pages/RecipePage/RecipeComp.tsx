import type { Dispatch, SetStateAction } from 'react'
import { Col } from "react-bootstrap"
import '../../CSS/RecipeContainer.css'
import type { Recipe } from '../../Components/Interfaces'
import notFoundImage from '../../assets/NotFound.jpg';


interface RecipeProp {
    recipe: Recipe
    selectedRecipe: Dispatch<SetStateAction<Recipe | undefined>>
}
/* Todo Component */
export const RecipeContainer = (props: RecipeProp) => {

    function handleClick() {
        props.selectedRecipe(props.recipe);
    }

    return (<>
        <Col className="recipeContainer" xs={10} sm={9} md={5} lg={4}>
            <h1 className="recipeTitle"><a onClick={handleClick} className="recipeLink">{props.recipe.title} by {props.recipe.author}</a></h1>
            <img
                src={props.recipe.imageData || notFoundImage}
                alt={`Image of ${props.recipe.title}`}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = notFoundImage;

                }}
                className="img-fluid my-3 justify-content-center d-flex recipeImg"
            />
        </Col>
    </>)
}