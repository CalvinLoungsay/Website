import { Col, Row, Form, Button } from 'react-bootstrap';

interface RecipeFormArrayProps {
    items: string[];
    onChange: (newIngredients: string[]) => void;
    isEditing: boolean;
    title: string;
}

export const RecipeFormArray = (props: RecipeFormArrayProps) => {
    const handleChange = (index: number, value: string) => {
        const updated = [...props.items];
        updated[index] = value;
        props.onChange(updated);
    };

    const handleDelete = (index: number) => {
        const updated = props.items.filter((_, i) => i !== index);
        props.onChange(updated);
    };

    const handleAdd = () => {
        props.onChange([...props.items, ""]);
    };

    return (
            <ul>
                {props.items.map((item, id) => (
                    <li key={id}>
                        {!props.isEditing ? (
                            item
                        ) : (
                            <Row className = "d-flex align-items-center">
                                <Col xs = {10} className ="">
                                    <Form.Control
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleChange(id, e.target.value)}
                                        className="recipeForm"
                                        bsPrefix="recipeForm"
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(id)}
                                    >
                                        X
                                    </Button>
                                </Col>

                            </Row>
                        )}
                    </li>
                ))}
                {props.isEditing && (
                    <Button variant="outline-primary" onClick={handleAdd} size="sm">
                        + Add New {props.title}
                    </Button>
                )}
            </ul>
    );
};

export default RecipeFormArray;
