import { useState } from 'react';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RecipeFormString } from './RecipeFormString'
import { RecipeFormArray } from './RecipeFormArray'
import { createRecipe } from '../../Components/RecipeComponent';
import "../../CSS/RecipeCreate.css"
import "../../CSS/RecipeDetails.css"

export function CreateRecipePage() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [servings, setServings] = useState<number>(1);
    const [imgData, setImgData] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [ingr, setIngr] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);
    const [baseNutrition, setBaseNutrition] = useState([
        { label: "Serving Size", value: "" },
        { label: "Calories", value: "" },
        { label: "Fat", value: "" },
        { label: "Saturated  Fat", value: "" },
        { label: "Carbohydrates", value: "" },
        { label: "Fiber", value: "" },
        { label: "Sugar", value: "" },
        { label: "Protein", value: "" },
        { label: "Cholesterol", value: "" },
        { label: "Sodium", value: "" },
    ]);

    const [customNutrition, setCustomNutrition] = useState<
        { label: string; value: string }[]
    >([]);

    const navigate = useNavigate();

    function handleSubmit() {
        const username = localStorage.getItem('username');
        if (username) {
            const combinedNutrition = [...baseNutrition, ...customNutrition];
            createRecipe(title, username, imgData, cookTime, desc, ingr, servings, combinedNutrition, steps);
            console.log("sucess");
        }
        console.log("done");
    }

    return (<>
        <Container fluid className="createContainer" bsPrefix='createContainer'>
            <Col>
                <Button onClick={() => navigate("/recipe")} className="backBtn">Back to Recipes</Button>
                <Row className="d-flex justify-content-center entryRow">
                    <Col className="entryCol d-flex justify-content-center" xs={12} md={2}>
                        <h5>Title</h5>
                    </Col>
                    <Col xs={12} md={5}>
                        <RecipeFormString value={title} onChange={setTitle} placeholder="Enter Title" type="text"></RecipeFormString>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center entryRow">
                    <Col className="entryCol d-flex justify-content-center" xs={12} md={2}>
                        <h5>Description</h5>
                    </Col>
                    <Col xs={12} md={5}>
                        <Col className="d-flex justify-content-center">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="recipeForm"
                                bsPrefix="recipeForm"
                            />
                        </Col>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center entryRow">
                    <Col className="entryCol d-flex justify-content-center" xs={12} md={2}>
                        <h5>Image Url</h5>
                    </Col>
                    <Col xs={12} md={5}>
                        <RecipeFormString value={imgData} onChange={setImgData} placeholder="Image" type="text"></RecipeFormString>

                    </Col>
                </Row>
                <Row className="d-flex justify-content-center entryRow">
                    <Col className="entryCol d-flex justify-content-center" xs={12} md={2}>
                        <h5>Cook Time</h5>
                    </Col>
                    <Col xs={12} md={5}>
                        <RecipeFormString value={cookTime} onChange={setCookTime} placeholder="Cook Time" type="text"></RecipeFormString>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center entryRow">
                    <Col className="entryCol d-flex justify-content-center" xs={12} md={2}>
                        <h5>Servings</h5>
                    </Col>
                    <Col xs={5} md={3} className="d-flex justify-content-center">
                        <Form.Control
                            type="number"
                            value={servings}
                            min={1}
                            onChange={(e) => setServings(Number(e.target.value))}
                            className="recipeForm"
                            bsPrefix="desc"
                        />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center entryRow">
                    <Col className="ingrContainer" sm={11} lg={5}>
                        <h5 className="d-flex justify-content-center">Ingredients:</h5>
                        <Col>
                            <RecipeFormArray items={ingr} onChange={setIngr} isEditing={true} title="Ingredient" />
                        </Col>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center entryRow">
                    <Col className="ingrContainer" sm={11} lg={5}>
                        <h5 className="d-flex justify-content-center">Steps:</h5>
                        <Col>
                            <RecipeFormArray items={steps} onChange={setSteps} isEditing={true} title="Steps" />
                        </Col>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center entryRow">
                    <ul>
                        {[...baseNutrition, ...customNutrition].map((item, id) => {
                            const isCustom = id >= baseNutrition.length;
                            const index = isCustom ? id - baseNutrition.length : id;

                            return (
                                <li key={id}>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Control
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => {
                                                    if (isCustom) {
                                                        const updated = [...customNutrition];
                                                        updated[index].label = e.target.value;
                                                        setCustomNutrition(updated);
                                                    }
                                                }}
                                                className="recipeForm"
                                                bsPrefix="recipeForm"
                                                disabled={!isCustom}
                                                placeholder="Label"
                                            />
                                        </Col>

                                        <Col xs={5}>
                                            {/* Value Field */}
                                            <Form.Control
                                                type="text"
                                                value={item.value}
                                                onChange={(e) => {
                                                    if (isCustom) {
                                                        const updated = [...customNutrition];
                                                        updated[index].value = e.target.value;
                                                        setCustomNutrition(updated);
                                                    } else {
                                                        const updated = [...baseNutrition];
                                                        updated[index].value = e.target.value;
                                                        setBaseNutrition(updated);
                                                    }
                                                }}
                                                className="recipeForm"
                                                bsPrefix="recipeForm"
                                                placeholder="Value"
                                            />
                                        </Col>

                                        <Col xs={1}>
                                            {/* Delete Button for Custom Items */}
                                            {isCustom && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => {
                                                        const updated = customNutrition.filter((_, i) => i !== index);
                                                        setCustomNutrition(updated);
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </Col>
                                    </Row>
                                </li>
                            );
                        })}
                    </ul>
                    <Row className="d-flex justify-content-center addNutrRow" xs={3}>
                        <Button variant="outline-primary" onClick={() => {
                            setCustomNutrition([...customNutrition, { label: "", value: "" }]);
                        }} size="sm">
                            + Add New Nutrition
                        </Button>
                    </Row>
                </Row>


                <Row className="finishContainer d-flex justify-content-center" sm ={5}>
                    <Button onClick={() => handleSubmit()} className="finishBtn">Finish</Button>
                </Row>
            </Col>
        </Container >
    </>)
}