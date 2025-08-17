import { Row, Col, Form, ListGroup } from 'react-bootstrap'
import type { Comment } from '../../Components/Interfaces'
import { RenderStars } from "../../Components/ReviewUtilities"
import { FormatTimeAgo } from '../../Components/ReviewUtilities'
import "../../CSS/RecipeDetails.css"

/* Interface of props needed for function with other components relating to Todo List
todo - Currently selected todo
todoList - List of all todos in the list
toggleCheck - Function that toggles whether or not its true or false using the id of the todo
deleteTodo - Function that deletes a todo using the todo's id */

interface formProps {
    value: string;
    onChange: (newValue: string) => void;
    placeholder: string;
    type: string;
}

/* Todo Component */
export const RecipeFormString = (props: formProps) => {

    return (<>
        <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center">
                <Form.Control
                    type= {props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    className="recipeForm"
                    bsPrefix="recipeForm"
                />
            </Col>
        </Row>
    </>
    )
}

export default RecipeFormString