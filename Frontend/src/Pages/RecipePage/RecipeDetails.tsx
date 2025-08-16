import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Container, Row, Col, ListGroup, Button, Form, Modal } from "react-bootstrap";
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import '../../CSS/RecipeDetails.css';
import { Recipe, Comment } from '../../Components/Interfaces';
import { CommentComp } from './Comment';
import { isOwner } from '../../Components/AuthComponents';
import { editRecipe, deleteRecipe } from '../../Components/RecipeComponent'
import { RecipeFormArray } from "./RecipeFormArray"
import { RecipeFormString } from './RecipeFormString'

interface RecipeProp {
    recipe: Recipe;
    selectedRecipe: Dispatch<SetStateAction<Recipe | undefined>>;
}

export const RecipeDetails = (props: RecipeProp) => {
    const [newComment, setNewComment] = useState("");
    const [recipe, setRecipe] = useState(props.recipe);
    const [comments, setComments] = useState<Comment[]>(recipe.comments);
    const [newRating, setNewRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isOwnerVar, setIsOwnerVar] = useState(false);

    const createdAt = new Date(recipe.createdAt);
    const updatedAt = new Date(recipe.updatedAt);

    const [title, setTitle] = useState(recipe.title);
    const [desc, setDesc] = useState(recipe.description);
    const [servings, setServings] = useState(recipe.servings);
    const [imgData, setImgData] = useState(recipe.imageData ?? "");
    const [cookTime, setCookTime] = useState(recipe.cookTime);
    const [ingr, setIngr] = useState(recipe.ingredients);
    const [steps, setSteps] = useState(recipe.steps);
    const [nutrition, setNutrition] = useState(recipe.nutrition);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    function goBack() {
        props.selectedRecipe(undefined);
    }

    function getAvg() {
        if (recipe.comments.length === 0) return 0;
        const total = recipe.comments.reduce((sum, comment) => sum + comment.rating, 0);
        return parseFloat((total / recipe.comments.length).toFixed(1));
    }

    const avgRating: number = getAvg();

    async function handleAddComment() {
        const username = localStorage.getItem('username');
        if (!username || !newComment || newRating < 0.5 || newRating > 5) return;

        const newEntry = await addNewComment(username, newComment, newRating);
        if (newEntry) {
            let newComment = newEntry.comments[0];

            setComments([newComment, ...comments]);
            setNewComment("");
            setNewRating(0);
        }
    }

    const addNewComment = async (
        name: string,
        comm: string,
        rate: number
    ): Promise<Recipe | null> => {
        try {
            console.log(recipe._id);
            const response = await fetch(`http://localhost:5000/recipe/` + recipe._id + '/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    username: name,
                    comment: comm,
                    rating: rate,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to post comment. Status: ${response.status}`);
            }

            const data = await response.json();
            return data as Recipe;
        } catch (error) {
            console.error("Comment creation failed:", error instanceof Error ? error.message : error);
            return null;
        }
    };

    useEffect(() => {
        const hasLoginCookie = document.cookie
            .split("; ")
            .some((cookie) => cookie.startsWith("LOGIN-AUTH="));
        setIsLoggedIn(hasLoginCookie);
        const checkOwner = async () => {
            const check = await isOwner(props.recipe.author);
            if (check) {
                setIsOwnerVar(true);
            }
        };
        checkOwner();

        const handleKeywordKeypress = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                goBack();
            }
        };

        document.addEventListener("keydown", handleKeywordKeypress);
        return () => {
            document.removeEventListener("keydown", handleKeywordKeypress);
        };
    }, []);

    function handleSubmit() {
        editRecipe(title, recipe.author, imgData, cookTime, desc, ingr, servings, nutrition, steps, String(recipe._id));
        setIsEditing(false);
    }

    function handleDelete() {
        setShowDeleteModal(true);
    }


    return (
        <Container className="detailContainer" bsPrefix='detailContainer'>
            <Col>
                <Row>
                    <Col>
                        <Button className="backBtn" onClick={goBack} bsPrefix='backBtn'>Back</Button>
                    </Col>
                    <Col xs={2} sm={2} lg={2} className="d-flex justify-content-end">
                        {isOwnerVar && !isEditing && (
                            <Button onClick={() => setIsEditing(true)} className="editBtn" bsPrefix="editBtn">Edit</Button>

                        )}
                        {isOwnerVar && isEditing && (
                            <Button onClick={handleSubmit} className="editBtn" bsPrefix="editBtn">Finish</Button>
                        )}
                        {isOwnerVar && (
                            <Button onClick={handleDelete} className="deleteBtn" bsPrefix='deleteBtn'>Delete</Button>
                        )}
                    </Col>
                </Row>
                {
                    !isEditing ? (
                        <h2 className="recipeTitle d-flex justify-content-center">{title}</h2>
                    ) : (
                        <Row className="titleContainer">
                            <RecipeFormString value={title} onChange={setTitle} placeholder="Enter Title" type="text" />
                        </Row>
                    )
                }
                <h3 className="desc justify-content-center d-flex">By : {recipe.author}</h3>
                <h5 className="desc justify-content-center d-flex">
                    Created : {`${createdAt.getDate()} ${createdAt.toLocaleString("en-CA", { month: "long" })} ${createdAt.getFullYear()}`}
                </h5>
                {createdAt.getTime() !== updatedAt.getTime() && (
                    <h5 className="desc justify-content-center d-flex">
                        Last Updated : {`${updatedAt.getDate()} ${updatedAt.toLocaleString("en-CA", { month: "long" })} ${updatedAt.getFullYear()}`}
                    </h5>
                )}
                <h2 className="desc justify-content-center d-flex">Average Rating: {avgRating}</h2>
                {
                    !isEditing ? (
                        <h4 className="desc justify-content-center d-flex">Cook Time : {cookTime}</h4>
                    ) : (
                        <Row className="d-flex justify-content-center formContainerString">
                            <Col sm={12} lg={3} className="d-flex justify-content-center">
                                <h5 className="formTitle">Cook Time</h5>
                            </Col>
                            <Col sm={12} lg={5}>
                                <RecipeFormString value={cookTime} onChange={setCookTime} placeholder="Enter Cook Time" type="text" />
                            </Col>
                        </Row>

                    )
                }
                {
                    !isEditing ? (
                        <h4 className="desc justify-content-center d-flex">Servings : {servings}</h4>
                    ) : (

                        <Row className="d-flex justify-content-center formContainerString">
                            <Col sm={12} lg={3} className="d-flex justify-content-center">
                                <h5 className="formTitle">Servings</h5>
                            </Col>
                            <Col sm={12} lg={2} className="d-flex justify-content-center">
                                <Form.Control
                                    type="number"
                                    value={servings}
                                    min={1}
                                    onChange={(e) => setServings(Number(e.target.value))}
                                    className="recipeForm"
                                    bsPrefix="recipeForm"
                                    style={{ textAlign: 'center' }}
                                />
                            </Col>
                        </Row>

                    )
                }
                {
                    !isEditing ? (
                        <h4 className="desc justify-content-center d-flex">{desc}</h4>
                    ) : (
                        <Row className="d-flex justify-content-center formContainerString">
                            <Col sm={12} lg={3} className="d-flex justify-content-center">
                                <h5 className="formTitle">Description</h5>
                            </Col>
                            <Col sm={12} lg={5}>
                                <Row className="d-flex justify-content-center">
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
                                </Row>
                            </Col>
                        </Row>

                    )
                }
                {
                    !isEditing ? (
                        <Col className="d-flex justify-content-center imgContainer">
                            <img
                                src={imgData}
                                alt={`Image of ${title}`}
                                className="img-fluid my-3 justify-content-center d-flex recipeImg"
                            />
                        </Col>
                    ) : (

                        <Row className="d-flex justify-content-center formContainerString">
                            <Col sm={12} lg={3} className="d-flex justify-content-center">
                                <h5 className="formTitle">Image Url</h5>
                            </Col>
                            <Col sm={12} lg={5}>
                                <RecipeFormString value={imgData} onChange={setImgData} placeholder="Enter Image Url" type="text" />
                            </Col>
                        </Row>
                    )
                }

                <Row className="d-flex justify-content-center ingrRowContainer">
                    <Col className="ingrContainer" sm = {12} lg = {5}>
                        <h5 className="d-flex justify-content-center">Ingredients:</h5>
                        <Col>
                            <RecipeFormArray items={ingr} onChange={setIngr} isEditing={isEditing} title="Ingredient" />
                        </Col>
                    </Col>
                    <Col className="ingrContainer" sm={11} lg={6}>
                        <h5 className="d-flex justify-content-center">Nutrition:</h5>
                        <ul>
                            {nutrition.map((item, id) => (
                                <li key={id}>
                                    {!isEditing ? (
                                        `${item.label} : ${item.value}`
                                    ) : (
                                        <Row fluid className="d-flex align-items-center">
                                            <Col xs={5}>
                                                <Form.Control
                                                    type="text"
                                                    value={item.label}
                                                    onChange={(e) => {
                                                        const newNutrition = [...nutrition];
                                                        newNutrition[id].label = e.target.value;
                                                        setNutrition(newNutrition);
                                                    }}
                                                    className="nutritionForm"
                                                    bsPrefix="nutritionForm"
                                                />
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Control
                                                    type="text"
                                                    value={item.value}
                                                    onChange={(e) => {
                                                        const newNutrition = [...nutrition];
                                                        newNutrition[id].value = e.target.value;
                                                        setNutrition(newNutrition);
                                                    }}
                                                    className="nutritionForm"
                                                    bsPrefix="nutritionForm"
                                                />
                                            </Col>
                                            <Col xs={1}>
                                                <Button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => {
                                                        const newNutrition = nutrition.filter((_, index) => index !== id);
                                                        setNutrition(newNutrition);
                                                    }}
                                                >
                                                    X
                                                </Button>
                                            </Col>

                                        </Row>
                                    )}
                                </li>
                            ))}
                            {
                                isEditing && (
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => setNutrition([...nutrition, { label: "", value: "" }])}
                                        size="sm"
                                    >
                                        + Add Nutrition Info
                                    </Button>
                                )
                            }
                        </ul>
                    </Col>
                </Row>

                <Row className="stepContainer">
                    <h5 className="d-flex justify-content-center">Steps:</h5>
                    <ol className="stepList">
                        {steps.map((step, id) => (
                            <li key={id}>
                                {!isEditing ? (
                                    step
                                ) : (
                                    <Row xs={8} className="d-flex align-items-center">
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                value={step}
                                                onChange={(e) => {
                                                    const newSteps = [...steps];
                                                    newSteps[id] = e.target.value;
                                                    setSteps(newSteps);
                                                }}
                                                className="recipeForm"
                                                bsPrefix="recipeForm"
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    const newSteps = steps.filter((_, index) => index !== id);
                                                    setSteps(newSteps);
                                                }}
                                            >
                                                ✕
                                            </Button>

                                        </Col>
                                    </Row>
                                )}
                            </li>
                        ))}

                        {isEditing && (
                            <li>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => setSteps([...steps, ""])}
                                    size="sm"
                                >
                                    + Add Step
                                </Button>
                            </li>
                        )}
                    </ol>

                </Row>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this recipe? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => {
                            deleteRecipe(String(recipe._id)).then((success) => {
                                if (success) {
                                    console.log("Recipe deleted successfully.");
                                    props.selectedRecipe(undefined); // Go back or refresh
                                } else {
                                    console.error("Failed to delete recipe.");
                                }
                                setShowDeleteModal(false);
                            });
                        }}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>



                {isLoggedIn && (
                    <div className="ratingContainer">
                        <label className="ratingLabel">Your Rating:</label>
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            const displayValue = hoverRating ?? newRating;
                            const iconSize = 30;

                            let icon;
                            if (displayValue >= starValue) {
                                icon = <FaStar size={iconSize} color="#ffc107" />;
                            } else if (displayValue >= starValue - 0.5) {
                                icon = <FaStarHalfAlt size={iconSize} color="#ffc107" />;
                            } else {
                                icon = <FaRegStar size={iconSize} color="#ccc" />;
                            }

                            return (
                                <span
                                    key={index}
                                    style={{
                                        cursor: "pointer",
                                        color: starValue <= displayValue ? "#ffc107" : "#ccc"
                                    }}
                                    className="stars"
                                    onMouseMove={(e) => {
                                        const { left, width } = e.currentTarget.getBoundingClientRect();
                                        const x = e.clientX - left;
                                        const isHalf = x < width / 2;
                                        setHoverRating(index + (isHalf ? 0.5 : 1));
                                    }}
                                    onMouseLeave={() => setHoverRating(null)}
                                    onClick={() => setNewRating(hoverRating ?? newRating)}
                                >
                                    {icon}
                                </span>
                            );
                        })}
                        <textarea
                            className="form-control commentBox"
                            placeholder="Leave a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button onClick={handleAddComment} className="addCommentBtn">Add Comment</Button>
                    </div>
                )}

                <h5 className="commentSection">Comments:</h5>
                <ListGroup className="commentSection">
                    {comments.map((c, index) => (
                        <CommentComp key={index} comment={c} index={index} />
                    ))}
                </ListGroup>
            </Col>
        </Container>
    );
};