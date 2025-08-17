import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { RecipeContainer } from './RecipeComp'
import { RecipeDetails } from './RecipeDetails'
import '../../CSS/RecipePage.css'
import { getRecipes } from '../../Components/RecipeComponent'
import type { Recipe } from '../../Components/Interfaces'

export function RecipePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const fetchRecipes = async () => {
        const data = await getRecipes();
        setRecipes(data);
    }


    useEffect(() => {
        if (!selectedRecipe) {
            fetchRecipes();
        }
    }, [selectedRecipe]);


    return (<>
        <Container fluid>
            {!selectedRecipe ? (
                <Row>
                    <Col sm={12} lg={9} className="d-flex justify-content-center searchCol">
                        <Container className="mb-3 searchContainer d-flex justify-content-center">
                            <input
                                type="text"
                                className="form-control searchBar"
                                placeholder="Search recipes by title or author."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Container>
                    </Col>
                    <Col className="d-flex justify-content-center createCol">
                        <Button onClick={() => navigate("/recipe/create")} className="createBtn"> Create Recipe</Button>
                    </Col>
                    <Row className = "filteredRecipeContainer d-flex justify-content-center" >
                        {

                            filteredRecipes.map((recipe) => (
                                <RecipeContainer recipe={recipe} selectedRecipe={setSelectedRecipe} />
                            ))
                        }
                    </Row>
                </Row>

            ) : (
                <RecipeDetails recipe={selectedRecipe} selectedRecipe={setSelectedRecipe} />
            )}
        </Container>
    </>)
}