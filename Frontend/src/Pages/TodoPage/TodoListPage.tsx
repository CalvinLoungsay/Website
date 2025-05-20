import { useState, useEffect } from 'react'
import { TodoComp } from "./Todo"
import { NewTodoForm } from './NewTodoForm'
import { Container, Row, Col, ListGroup } from "react-bootstrap"
import "../../CSS/TodoList.css"

/* Todo interface */
interface Todo {
  id: number
  title: String
  completed: boolean
}

/* Page with the todo list*/
export function TodoListPage() {

  /* Use state for number of todo's created for unique id's*/
  const [count, setCount] = useState<number>(() => {
    const localValue = localStorage.getItem("COUNT")
    if (localValue == null) return 1

    return JSON.parse(localValue)
  })
  /* Use state that holds the array list of the todos in browser*/
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  /* Use effect that sets the localstorage to updated json's*/
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
    localStorage.setItem("COUNT", JSON.stringify(count))
  }, [todos])

  /* Add todo function using value from textbox */
  function addTodo(title: String) {
    let item: Todo = { id: count, title: title, completed: false }
    setCount(prev => prev + 1)
    setTodos((currentTodos) => {
      return [...currentTodos, item]
    })
  }
  /* Toggles the check for true or false on the todo*/
  function toggleCheck(id: number, completed: boolean) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }
  /* Deletes the todo with the id of the given number*/
  function deleteTodo(id: number) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (<>
    {/* Container holding the entire todo list page4 */}
    <Container className="todoContainer">
      {/* Add Todo component */}
      <Row className="mx-5">
        <Col className="d-flex justify-content-center">
          <h1 className="todoHeader">Todo Creation</h1>
        </Col>
      </Row>
      <NewTodoForm addTodo={addTodo} />
      {/* Todo List component */}
      <Row className="mx-5">
        <Col className="d-flex justify-content-center">
          <h1 className="listHeader">Todo List</h1>
        </Col>
      </Row>
      <Row>
        {todos.length === 0 && <h3 className="d-flex justify-content-center my-4">No Todos</h3>}
      </Row>

      <ListGroup as="ul" className="todoList gap-2">
        {
          /* Maps every todo in the todo list into a new todo component */
          todos.map(todo => {
            return <TodoComp todo={todo} todoList={todos} toggleCheck={toggleCheck} deleteTodo={deleteTodo} key={todo.id}></TodoComp>;
          })
        }
      </ListGroup>
    </Container>
  </>
  )
}