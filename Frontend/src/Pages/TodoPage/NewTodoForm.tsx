import { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

/* Prop holding the function to add a todo from the TodoListPage */
interface TodoFormProp {
    addTodo: (title: string) => void
}

/* New Todo Form component */
export function NewTodoForm({ addTodo }: TodoFormProp) {

    /* Use state holding the new Todo and its setter */
    const [newItem, setNewItem] = useState("")

    /* Creates new todo when submit is clicked also checks if empty */
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (newItem === "") return

        addTodo(newItem)

        setNewItem("")
    }

    return (<>
        <Form onSubmit={handleSubmit} className="new-item-form justify-content-center d-flex">
            <Row>
                <Col className="d-flex justify-content-center">
                    {/* Value - New todo object
                        onChange - On click create a new todo with the value in the textbox */}
                    <Form.Control
                        value={newItem}
                        onChange={e => setNewItem(e.target.value)}
                        type="text"
                        id="newTodoField"
                        placeholder="Enter Todo"
                        className="newTodoField"
                        bsPrefix="newTodoField"
                    />
                </Col>
                <Col className="d-flex justify-content-center">
                    <Button type="submit" className="addBtn" bsPrefix="addBtn">
                        <h5 className="addBtnText">Add</h5>
                    </Button>
                </Col>
            </Row>
        </Form>

    </>
    )
}