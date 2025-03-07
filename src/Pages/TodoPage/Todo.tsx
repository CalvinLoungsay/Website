import { Button, Row, Col, Form } from 'react-bootstrap'
import "../../CSS/TodoList.css"


interface Todo {
    id: number
    title: String
    completed: boolean
}

interface TodoProps {
    todo: Todo
    todoList: Todo[]
    toggleCheck: (id: number, completed: boolean) => void
    deleteTodo: (id: number) => void
}



export const TodoComp = (props: TodoProps) => {

    return (<>
        <Row className="mx-2 my-2 justify-content-center">
            <Col className="d-flex justify-content-end align-items-center" xs ={1} sm={1} lg={1}>
                <Form.Check checked={props.todo.completed} onChange={e => props.toggleCheck(props.todo.id, e.target.checked)} className="d-flex"></Form.Check>
            </Col>
            <Col className="d-flex align-items-center" xs={5}sm={4} lg={3}>
                {<h1 className = "todoName">{props.todo.title}</h1>}
            </Col>
            <Col className="d-flex align-items-center" xs={3}sm={3} lg={2}>
                <button onClick={() => props.deleteTodo(props.todo.id)} className = "deleteBtn"><h5 className="deleteText">Delete</h5></button>
            </Col>
        </Row>
    </>
    )
}