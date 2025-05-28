import { Row, Col, Form } from 'react-bootstrap'
import "../../CSS/TodoList.css"

/* Todo interface */
interface Todo {
    id: number
    title: String
    completed: boolean
}

/* Interface of props needed for function with other components relating to Todo List
todo - Currently selected todo
todoList - List of all todos in the list
toggleCheck - Function that toggles whether or not its true or false using the id of the todo
deleteTodo - Function that deletes a todo using the todo's id*/
interface TodoProps {
    todo: Todo
    todoList: Todo[]
    toggleCheck: (id: number, completed: boolean) => void
    deleteTodo: (id: number) => void
}
/* Todo Component */
export const TodoComp = (props: TodoProps) => {

    return (<>
        <Row className="mx-2 my-1 justify-content-center">
            <Col className="d-flex justify-content-end align-items-center" xs={1} sm={1} lg={1}>
                <Form.Check checked={props.todo.completed} onChange={e => props.toggleCheck(props.todo.id, e.target.checked)} className="d-flex todoCheck"></Form.Check>
            </Col>
            <Col className="d-flex align-items-center" xs={9} sm={7} lg={7}>
                <h1 className="todoName">{props.todo.title}</h1>
            </Col>
            <Col className="d-flex align-items-center" xs={2} sm={2} lg={2}>
                <button onClick={() => props.deleteTodo(props.todo.id)} className="deleteBtn"><h5 className="deleteText">Delete</h5></button>
            </Col>
        </Row>
    </>
    )
}